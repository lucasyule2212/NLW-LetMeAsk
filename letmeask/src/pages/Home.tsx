import React from "react";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";
import { Button } from "../components/Button";
import '../styles/auth.scss'

function Home() {
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
          <button className="create-room">
          <img src={googleIcon} alt="Logo Google" />
            Crie sua sala com Google        
          </button>
          <div className="separator">
            <h3>ou entre em uma sala</h3>
          </div>
          <form action="">
            <input
              type="text"
              placeholder="Insira aqui o código da sua melhor sala"
            />
            <Button type="submit">Entre na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export { Home };
