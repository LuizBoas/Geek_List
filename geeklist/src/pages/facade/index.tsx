import React, { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

import logoImg from "../../assets/images/logo.png";
import imageFacade from "../../assets/images/image-facade.png";
import { BsBoxArrowInRight } from "react-icons/bs";

import studyIcon from "../../assets/images/icons/study.svg";

function Facade(): ReactElement {
  return (
    <div id="page-facade">
      <div id="page-facade-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Geek List" />
          <h2>
            Explore o multiverso de Rick and Morty com nossa plataforma de
            personagens.
          </h2>
        </div>
        <img
          src={imageFacade}
          alt="Imagem da série Rick and Morty"
          className="hero-image"
        />

        <div className="button-container">
          <Link to="/list">
            <BsBoxArrowInRight size={50} className="button-container-img" />
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Facade;
