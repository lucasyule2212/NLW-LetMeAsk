import React, { FormEvent } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import Modal from 'react-modal'
import close_room from '../assets/images/close-room.svg'
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";
import { database } from "../services/firebase";


const customStyles = {
  overlay:{
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexFlow:'column',
    width:'500px',
    height:'300px',
    gap:'24px',
    backgroundColor: '#fefefe',
    justifyContent:'center',
    alignItems:'center',
  },
};
 
Modal.setAppElement('#root');

function Home() {
  const { user, signInWithGoogle } = useAuth();
  const [roomCode,setRoomCode] = useState('')

  const history = useHistory();

  const [modalIsOpen,setModalIsOpen] = useState(false)

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }


  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("rooms/new_room");
  }

  async function handleJoinRoom(event:FormEvent) {
    event.preventDefault()
    if (roomCode.trim()==='') {
     return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if(!roomRef.exists()){
      openModal();
      return;
    }
    if (roomRef.val().endedAt) {
     openModal();
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
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        >        
        <img src={close_room} alt="close room"/>
          <h2>Ops...</h2>
          <p>Parece que esta sala não está disponível!</p>
          <div style={{display:'flex', gap:'16px',marginTop:'16px'}}>
          <Button onClick={closeModal} isMuted={true} >Fechar</Button>
          </div>          
        </Modal>
      </main>
    </div>
  );
}

export { Home };
