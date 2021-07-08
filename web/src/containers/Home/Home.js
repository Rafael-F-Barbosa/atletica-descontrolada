import React from 'react';
import classes from './Home.module.css'
import instaImg from '../../assets/images/instagram.png'

const home = () => {
	return (
		<div className={classes.HomeContainer}>
			<div className={classes.HomeCenter}>
				<div className={classes.Left}>
					<div className={classes.Title}>
						<h1>DES</h1>
						<h1>CON</h1>
						<h1>TRO</h1>
						<h1>LADA</h1>
					</div>
				</div>
				<div className={classes.Right}>
					<h2>Fundada em 2018, A Atlética Descontrolada representa os alunos da Engenharia Mecatrônica-UnB em competições esportivas e realiza eventos que promove a integração entre os alunos do curso.</h2>
					<a href={"https://www.instagram.com/atleticadescontrolada/"}> <img src={instaImg} alt={"Instagram icon"} /></a>
				</div>
			</div>
		</div>
	);
};

export default home;
