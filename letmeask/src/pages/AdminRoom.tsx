import React from "react";
import logo from "../assets/images/logo.svg";
import deleteImage from '../assets/images/delete.svg'

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";

import { useHistory, useParams } from "react-router-dom";
import "../styles/room.scss";
import { Question } from "../components/Question";
import{useRoom} from '../hooks/useRoom'
import { database } from "../services/firebase";


// import { Container } from './styles';

type RoomParams = {
  id: string;
};

function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomID = params.id;

  const {questions,title}=useRoom(roomID)

  async function handleEndRoom(){
    await database.ref(`rooms/${roomID}`).update({
      endedAt:new Date()
    })
    history.push('/');
  }
  async function handleDeleteQuestion(questionId:string) {
  if(window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
     await database.ref(`rooms/${roomID}/questions/${questionId}`).remove();
  }
  }


  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="letmeask" />
          <div>
          <RoomCode code={roomID} />
          <Button onClick={()=>{handleEndRoom()}} isOutlined>Encerrar sala</Button>
          </div>
       
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>{title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((userQuestion) => {
            return (
              <Question
                key={userQuestion.id}
                content={userQuestion.content}
                author={userQuestion.author}
              >
                <button type="button"onClick={()=>{handleDeleteQuestion(userQuestion.id)}}>
                  <img src={deleteImage} alt=" Deletar Pergunta"/>
                </button>
              </Question>
              
            );
          })}
        </div>
      </main>
    </div>
  );
}
export { AdminRoom };


