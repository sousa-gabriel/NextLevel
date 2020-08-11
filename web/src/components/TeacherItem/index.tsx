import React from 'react';
import api from '../../services/api';
import './styles.css'

//imagens
import WhatsAppIcon from '../../assets/images/icons/whatsapp.svg';


export interface Teacher{
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name:string;
    subject:string;
    whatsapp: string;
}
interface TeacherItemProps{
    teacher:Teacher;
}

const TeacherItem: React.FunctionComponent<TeacherItemProps>=({teacher}) => {
    
    //criando uma nova conecção 
    function createNewConnection(){
        api.post('conections',{
            user_id: teacher.id,
        })
    }
    return(
    <article className="teacher-item">
        <header>
            <img src={teacher.avatar} alt={teacher.name}/>
            <div>
                <strong>{teacher.name}</strong>
                <span>{teacher.subject}</span>
            </div>
        </header>
        <p>{teacher.bio}</p>
        <footer>
            <p>
                Preço/hora
                <strong>{teacher.cost}</strong>
            </p>
            <a href={`https:/wa.me/${teacher.whatsapp}`} onClick={createNewConnection}>
                <img src={WhatsAppIcon} alt="Icone do Whats"/>
                Entrar em contato
            </a>
        </footer>
    </article>
    )
}
export default TeacherItem;