import Knex from 'knex';

export async function up(Knex:Knex){
    return Knex.schema.createTable('classes',table =>{
        //criando as tabelas 
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        //criando uma relação entre professor / aluno
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE') //quando o id for alterado na plataforma
            .onDelete('CASCADE') //quando o professor for deletado da plataforma
            ;
    });
}

export async function down(Knex:Knex){
    //caso de algo errado ele utiliza esta função
    return Knex.schema.dropTable('classes');

}