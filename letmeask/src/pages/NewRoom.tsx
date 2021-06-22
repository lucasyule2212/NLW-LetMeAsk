import React from "react";
import { Link } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import happyMoji from "../assets/images/1F601.svg"

import { Button } from "../components/Button";

import '../styles/auth.scss'
import { useAuth } from "../hooks/useAuth";

function NewRoom() {
  const {user} = useAuth()

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustraçao Question/Answer" />
        <strong>Crie salas de Q&amp;A em tempo real!</strong>
        <p>Responda as perguntas dos seus viewers de maneira otimizada.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo LetMeAsk" />
          <h2>Olá, {user?.name}</h2>
          <img src={happyMoji} alt="Happy Emoji" width="50px"/>
         <h2>Crie uma nova sala</h2>
          <form action="">
            <input
              type="text"
              placeholder="Insira o nome da sala"
            />
            <Button type="submit">Criar na sala</Button>
          </form>
          <p>Deseja entrar em alguma sala existente?<Link to="/"> Clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
}

export { NewRoom };
