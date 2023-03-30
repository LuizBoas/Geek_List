import React, { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

import logoImg from "../../assets/images/123.png";
import landingImg from "../../assets/images/capaa.svg";

import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";

function Landing(): ReactElement {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>
        <img
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/list" className="study">
            <img src={studyIcon} alt="Entrar" />
            Entrar
          </Link>
        </div>

        {/* <span className="total-connections">
          Total de conexões já realizadas
          <img src={purpleHeartIcon} alt="Coração roxo" />
        </span> */}
      </div>
    </div>
  );
}

export default Landing;
