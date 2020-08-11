import React,{useState, FormEvent} from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

import './styles.css';

//componentes
import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import Input from '../../components/Input';

//imagens
import warningIcon from '../../assets/images/icons/warning.svg'


function TeacherForm() {
    //criando uma variavel para que quando o usuario salve volte para a pagina inicial
    const history = useHistory();

    //criando uma variavel para manipular os input
    const [name,setName] = useState('');
    const [avatar,setAvatar] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    //inserindo o state para manipular os horarios de aulas
    const [scheduleItems, setScheduleItems]=useState([
        { week_day:0, from:'', to:''},
    ])
    //criando uma função que manipula o stado do intem para inserir mais um horario
    function addNewscheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            { week_day:0, from:'', to:''}
        ])
    }
    //criando a função que manipula os dados de dias e horas para o envio do banco de dados 
    function setScheduleItemValue(position:number, field:string, value:string){
        const updatedScheduleItemValue = scheduleItems.map((scheduleItem, index)=>{
            if(index === position){
                return {...scheduleItem, [field]:value};
            }
            return scheduleItem;
        });
        setScheduleItems(updatedScheduleItemValue);
        console.log(updatedScheduleItemValue)
    }

    //criando a função que salva no banco os dados do fromulario
    function handleCreateClass(e:FormEvent){
        e.preventDefault();//comprime o evento padrão de um formulario

        //cadastrando no bando de dados
        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost:Number(cost),
            schedule:scheduleItems
        }).then(()=>{
            alert('Cadastro realizado com sucesso!!');
            //redirecionando o usuario para tela principal
            history.push('/');
        }).catch((error)=>{
            alert('Erro no cadastro' + error);
        })
    }
    return(
        <div id="page-teacher-from" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas." 
                description="O primeiro passo, é preencher este formulário de descrição."
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <Input 
                            name="name" 
                            label="Nome Completo" 
                            value={name} 
                            onChange={(e)=>{ setName(e.target.value)}} //pega o valor digitado pelo usuario no primeiro input
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar}
                            onChange={(e)=>{setAvatar(e.target.value)}}
                        />
                        <Input 
                            name="whatsapp" 
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e)=>{setWhatsapp(e.target.value)}}
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio}
                            onChange={(e)=>{setBio(e.target.value)}}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
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
                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e)=>{setCost(e.target.value)}}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewscheduleItem}>
                                + Novo horário
                            </button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) =>{
                            return(
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select 
                                        name="week_day" 
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue (index ,'week_day', e.target.value)} //quando ja esta criado o state chamamos uma função para manipular 
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
                                        name="from" 
                                        label="Das" 
                                        type="Time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue (index ,'from', e.target.value)}
                                    />
                                    <Input 
                                        name="to"   
                                        label="Até" 
                                        type="Time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue (index ,'to', e.target.value)}
                                    />
                                </div>    
                            )
                        })

                        }
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso de importante"/>
                            Importante!! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit" >
                            Salvar Cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}
export default TeacherForm;