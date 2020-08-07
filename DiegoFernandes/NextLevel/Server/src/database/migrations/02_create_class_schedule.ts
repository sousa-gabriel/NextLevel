import Knex from 'knex';

export async function up(Knex:Knex){
    return Knex.schema.createTable('class_schedule',table =>{
        //criando as tabelas 
        table.increments('id').primary();
        
        table.integer('week_day').notNullable(); //dias da semana 
        table.integer('from').notNullable();     //horario de inicio do trabalho
        table.integer('to').notNullable();       //horario de fim do trabalho

        //criando uma relação entre professor / aluno
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')  //qual tabela que se relaciona
            .onUpdate('CASCADE') //quando o id for alterado na plataforma
            .onDelete('CASCADE') //quando o professor for deletado da plataforma
            ;
    });
}

export async function down(Knex:Knex){
    //caso de algo errado ele utiliza esta função
    return Knex.schema.dropTable('class_schedule');

}