import express, { request, response } from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const ClassesControllers = new  ClassesController();
const connectionsController = new ConnectionsController();

routes.get('/classes', ClassesControllers.index );
routes.post('/classes', ClassesControllers.create );
routes.get('/connections',connectionsController.index);
routes.post('/connections',connectionsController.create);

export default routes;


//rota padrão
// routes.get('/', (request, response)=>{
//     return response.json({message:'Hello World'});
// });

//cadastro da classe no insomnia
// {
// 	"name":"Julio", 
// 	"avatar":"https://media-exp1.licdn.com/dms/image/C5603AQEtkySkQ8bh2Q/profile-displayphoto-shrink_800_800/0?e=1602115200&v=beta&t=fChLIreiyl3L_gBO8LXWGxzyNaI7zwjU0xtkWXIns78",
// 	"whatsaap":"984388457",
// 	"bio":"O Júlio é um profissional que busca excelência em tudo que faz, possui conhecimento imenso em .net(C#) e frameworks relacionados. ",
// 	"subject":"Programação C#",
// 	"cost":200,
// 	"schedule":[
// 	{ "Week_day":1, "from":"8:00", "to":"12:00"	},
// 	{ "Week_day":2, "from":"10:00", "to":"18:00"	},
// 	{ "Week_day":3, "from":"15:00", "to":"20:00"	},
// 	{ "Week_day":4, "from":"19:00", "to":"21:00"	}
// 	]	
// }