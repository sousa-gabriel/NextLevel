import{ Request,Response }from 'express'

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

//definindo um formato para o nosso scheduleItem
interface scheduleItem{
    week_day:number;
    from:string;
    to:string;
}

export default class ClassesController{
    async index(request:Request, response:Response){
        const filters = request.query;
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        //criando um if para verificar se o usuario aplicou algum filtro
        if( !filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({
                error: "Não contém filtros selecionados"
            })
        }

        const timeInMinutes = convertHourToMinutes(time);
        const classes = await db('classes')
        //verificando os horarios disponiveis
            .whereExists(function(){
                this.select('class_schedule.*') //pega toda a tabela da class_schedule
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`') //verifica se o id da tabela de classes é igual ao da tabela de users
                    .whereRaw('`class_schedule`.`week_day` = ??',[Number(week_day)]) //verifica se o professor do id esta disponivel no dia da semana
                    .whereRaw('`class_schedule`.`from` <= ??',[timeInMinutes])//verifica se o professor iniciou os trabalhos antes do horario desejado de atendimento
                    .whereRaw('`class_schedule`.`to` > ??',[timeInMinutes]) //verifica se o professor ainda esta trabalhando no horario desejado
            })

            .where('classes.subject', '=',subject) //verifica se a materia esta batendo com a selecionada
            .join('users', 'classes.user_id','=','users.id') //vincula o usuario encontrado no filtro com o usuario cadastrado
            .select(['classes.*','users.*']);//tras todos os dados do usuario cadastrado
        

        return response.json(classes);
    }
    async create(request:Request,response:Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
             
        }=request.body;
    
        //ciração de uma variavel para que obriga enviar todas as transações juntas
        const trx = await db.transaction();
        
        try{
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            })
            const user_id =  insertedUsersIds[0]; //para que ele possa fazer nossa chave estrangeira 
            
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            })
        
            const class_id = insertedClassesIds[0];
        
            const classSchedule = schedule.map((scheduleItem:scheduleItem) =>{
                return{
                    class_id,
                    week_day : scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            })
            await trx('class_schedule').insert(classSchedule);
        
            //aqui finalmente ele faz as alterações no banco de dados 
            await trx.commit();
        
            return response.status(201).send();//retorna criado com sucesso
        }catch(err){
            await trx.rollback();
    
            return response.status(400).json({
                error: 'Erro inesperado na criação de uma nova classe'
            })
        }
    }
}
