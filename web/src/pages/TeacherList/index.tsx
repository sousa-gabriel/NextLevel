import React, { useState, FormEvent } from 'react';
import api from '../../services/api';
import './styles.css';

//componentes
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';


function TeacherList(){
    //criando a lista de professores em um stado
    const[teachers, setTeachers] =useState([]);



    //declarando as variaveis de stado para todas os dados de input
    const [subject , setSubject  ] = useState('');
    const [week_day, setWeek_day ] = useState('');
    const [time    , setTime     ] = useState(''); 

    //função para procurar os professores
    async function searchTeachers(e: FormEvent){
        e.preventDefault();
        //enviando a requisição de pesquisa para o banco de dados 
        const response = await api.get('classes',{
            params:{
                subject,
                week_day,
                time,
            }
       });
       setTeachers(response.data);//gera a resposta do banco 
    }

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys diponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        name="subject" 
                        label="Máteria"
                        value={subject}
                        onChange={(e)=>{setSubject(e.target.value)}}
                        options={[
                            {value:'Programação C#',           label:'Programação C#'           },
                            {value:'Programação java',         label:'Programação java'         },
                            {value:'Programação WEB básico',   label:'Programação WEB básico'   },
                            {value:'Programação POO',          label:'Programação POO'          },
                            {value:'Introdução a Programação', label:'Introdução a Programação' },
                        ]}
                    />
                    <Select 
                        name="week_day" 
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e)=>{setWeek_day(e.target.value)}}
                        options={[
                            {value:'0',label:'Domingo'},
                            {value:'1',label:'Segunda-feira'},
                            {value:'2',label:'Terça-feira'},
                            {value:'3',label:'Quarta-feira'},
                            {value:'4',label:'Quinta-feira'},
                            {value:'5',label:'Sexta-feira'},
                            {value:'6',label:'Sábado'},
                        ]}
                    />
                    <Input 
                        type="time" 
                        name="time" 
                        label="Hora"
                        value={time}
                        onChange={(e)=>{setTime(e.target.value)}}
                    />
                    <button type="submit">
                        Buscar
                    </button>
                </form>  
            </PageHeader> 
            <main>
                {
                    //Exibindo os professores selecionados na tela
                    teachers.map((teacher:Teacher) => {
                        return <TeacherItem key={teacher.id} teacher={teacher}/>;//passando uma props com um objeto para o componente teacher
                    })
                }
            </main>
        </div>
    )
}
export default TeacherList;