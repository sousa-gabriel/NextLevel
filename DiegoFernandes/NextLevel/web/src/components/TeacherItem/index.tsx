import React from 'react';
import './styles.css'

import WhatsAppIcon from '../../assets/images/icons/whatsapp.svg';


function TeacherItem(){
    return(
    <article className="teacher-item">
        <header>
            <img src="https://avatars0.githubusercontent.com/u/44657244?s=460&u=2b3b45fe62bb34e78b53c0e266905318d6952c46&v=4" alt="Gabriel Rocha"/>
            <div>
                <strong>Gabriel rocha</strong>
                <span>Programação Web</span>
            </div>
        </header>
        <p>
            Gabriel Rocha é ele
            <br/><br/>
            Em Junho de 2005, Gabriela, com 11 anos, se inscreveu para o Jovens Talentos, no programa de televisão nacional e em Maio de 2007 ganhou o concurso.
        </p>
        <footer>
            <p>
                Preço/hora
                <strong>R$20,00</strong>
            </p>
            <button>
                <img src={WhatsAppIcon} alt="Icone do Whats"/>
                Entrar em contato
            </button>
        </footer>
    </article>
    )
}
export default TeacherItem;