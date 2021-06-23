import React, { FormEvent } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";
import { database } from "../services/firebase";



function Home() {
  const { user, signInWithGoogle } = useAuth();
  const [roomCode,setRoomCode] = useState('')

  const history = useHistory();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new_room");
  }

  async function handleJoinRoom(event:FormEvent) {
    event.preventDefault()
    if (roomCode.trim()==='') {
     return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if(!roomRef.exists()){
      alert('Room does not exists!');
      return;
    }
    history.push(`rooms/${roomCode}`);
  }

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
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIcon} alt="Logo Google" />
            Crie sua sala com Google
          </button>
          <div className="separator">
            <h3>ou entre em uma sala</h3>
          </div>
          <form action="" onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Insira aqui o código da sua melhor sala"
              onChange={(event)=>{setRoomCode(event.target.value)}}
              value={roomCode}
            />
            <Button type="submit">Entre na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export { Home };
