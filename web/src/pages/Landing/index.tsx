import React, { useState, useEffect } from 'react';
import './styles.css';
import {Link} from'react-router-dom';
import api from '../../services/api';

//imagens
import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';


function Landing(){
   //gerando um state para total de conecções
    const [totalConnections, settotalConnections] = useState(0);
   
    //usando a useEffect para manter atualizado o numero de conecções 
    useEffect(()=>{
        api.get('connections').then(response => {
            const {total} = response.data;

            settotalConnections(total);
        })
    },[]);
   
    return(
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
                <img src={landingImg} alt="Plataforma de estudos" className="hero-image"/>
                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar Aulas"/>
                        Dar Aulas
                    </Link>
                </div>
                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="coração roxo"/>
                </span>
            </div>
        </div>
    )
}
export default Landing;