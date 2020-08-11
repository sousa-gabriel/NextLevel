//principal arquivo da aplicação e primeiro arquivo a ser aberto
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app =express();

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3333);//ouve um endereço http (passando o endereço)



//informações extras
//Get: Buscar ou listar uma informação
//post: criar alguma nova informação
//put: alterar/ atualizar uma informação ja criada
//delite: deletar uma informação existente

//corpo (requestBody): Daos para criação ou atulaização de um registro
//Route params: Identificar qual recurso eu quero atualizar ou deletar
//query params: paginação, filtro, ordenação 
