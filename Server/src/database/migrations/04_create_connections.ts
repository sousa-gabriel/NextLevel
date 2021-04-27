import Knex from 'knex';

export async function up(Knex:Knex){
    return Knex.schema.createTable('connections',table =>{
        //criando as tabelas 
        table.increments('id').primary();
        
        //criando uma relação entre professor / aluno
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')  //qual tabela que se relaciona
            .onUpdate('CASCADE') //quando o id for alterado na plataforma
            .onDelete('CASCADE') //quando o professor for deletado da plataforma
            ;
        //criando quando foi criada
        table.timestamp('created_at')
            .defaultTo(Knex.raw('CURRENT_TIMESTAMP')) //pega o horario atual que foi entrado em contato com o professor
            .notNullable();
    });
}

export async function down(Knex:Knex){
    //caso de algo errado ele utiliza esta função
    return Knex.schema.dropTable('connections');

}