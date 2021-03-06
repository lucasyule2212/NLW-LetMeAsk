import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FormEvent } from "react";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import happyMoji from "../assets/images/1F601.svg"

import { database } from "../services/firebase";

import { Button } from "../components/Button";

import '../styles/auth.scss'
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

function NewRoom() {

  useEffect(()=>{
    console.log(document.body.classList);
    
    if (document.body.classList.contains('dark-mode')) {
      console.log(document.body.classList);
      
      document.body.classList.remove('dark-mode')
    }
  },[])

  const {user} = useAuth();
  const[newRoom,setNewRoom]=useState('');
  const history = useHistory()

  async function handleCreateNewRoom(event:FormEvent) {
    event.preventDefault();

    if (newRoom.trim()==='') {
      return;
    }
    const roomRef=database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title:newRoom,
      authorId:user?.id,
    })
   
    history.push(`admin/${firebaseRoom.key}`)
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
          <h2>Olá, {user?.name}</h2>
          <img src={happyMoji} alt="Happy Emoji" width="50px"/>
         <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateNewRoom}>
            <input
              type="text"
              placeholder="Insira o nome da sala"
              onChange={(event)=>{setNewRoom(event.target.value)}}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>Deseja entrar em alguma sala existente?<Link to="/"> Clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
}

export { NewRoom };
