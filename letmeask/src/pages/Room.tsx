import React, { FormEvent } from 'react';
import logo from '../assets/images/logo.svg'
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom';
import '../styles/room.scss'
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

// import { Container } from './styles';
type RoomParams={
  id:string;
}
function Room() {
  const {user} = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion,setNewQuestion]=useState('')

  const roomID = params.id;

  async function handleSendQuestion(event:FormEvent) {
    event.preventDefault();
    if(newQuestion.trim()===''){
      return;
    }
    if (!user) {
      throw new Error ('You must be logged in!');
    }
    const question={
      content:newQuestion,
      author:{
        name:user.name,
        avatar:user.avatar,
      },
      isHighlighted:false,
      isAnswered:false
    }

    await database.ref(`rooms/${roomID}/questions`).push(question);
    setNewQuestion('')

  }

  return(
   <div id="page-room">
     <header>
       <div className="content">
        <img src={logo} alt="letmeask"/>
        <RoomCode code={roomID}/>
       </div>
     </header>
     <main >
      <div className="room-title">
        <h1>React</h1>
        <span>4 perguntas</span>
      </div>
      <form onSubmit={handleSendQuestion}>
        <textarea placeholder="Manda aí tua melhor pergunta!" onChange={(event)=>{setNewQuestion(event.target.value)}} value={newQuestion}/>
        <div className="form-footer">
          {user?(
          <div className="user-info" >
            <img src={user.avatar} alt={`Avatar de ${user.name}`}></img>
            <span>{user.name}</span>
          </div>
          ):(<span>Para enviar uma pergunta, <button>faça o login.</button></span>)}
          <Button type="submit" disabled={!user}>  
            Enviar pergunta
          </Button>
        </div>
      </form>

     </main>
   </div>
  );
}
export {Room}