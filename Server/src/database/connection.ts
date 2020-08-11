import Knex from 'knex';
import path from 'path';

const db = Knex({
    client:'sqlite3',
    connection:{
        filename:path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault:true,//padrão para um campo sem parametro como nulo
});

export default db;


//migrations - controlam a versão do banco de dados