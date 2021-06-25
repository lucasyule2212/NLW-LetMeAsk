import React from "react";
import logo from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import empty_question from "../assets/images/empty-questions.svg";
import close_room from '../assets/images/close-room.svg'
import { useHistory, useParams } from "react-router-dom";
import "../styles/room.scss";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import { useState } from "react";
import { useEffect } from "react";
import Modal from 'react-modal'



// import { Container } from './styles';


type RoomParams = {
  id: string;
};
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
 
Modal.setAppElement('#root')

function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomID = params.id;
  const [questionsLength,setQuestionsLength]=useState<number>(0)
  const [modalIsOpen,setModalIsOpen] = useState(false)

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
////////
  const { questions, title } = useRoom(roomID);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomID}`).update({
      endedAt: new Date(),
    });
    history.push("/");
  }
  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${roomID}/questions/${questionId}`).remove();
    }
  }
  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomID}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }
  async function handleHighlightQuestion(questionId: string) {
    const questionRef = await database
      .ref(`rooms/${roomID}/questions/${questionId}`)
      .get();

    if (questionRef.val().isHighlighted) {
      await database.ref(`rooms/${roomID}/questions/${questionId}`).update({
        isHighlighted: false,
      });
      return;
    }
    await database.ref(`rooms/${roomID}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }
////////
  useEffect(()=>{
    setQuestionsLength(questions.length)
  },[questions.length]);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="letmeask" />
          <div>
            <RoomCode code={roomID} />
            <Button
              onClick={openModal}
              isOutlined
            >
              Encerrar sala
            </Button>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            >        
            <img src={close_room} alt="close room"/>
              <h2>Encerrar sala</h2>
              <p>Tem certeza que você deseja encerrar esta sala?</p>
              <div style={{display:'flex', gap:'16px',marginTop:'16px'}}>
              <Button onClick={closeModal} isMuted={true} >Cancelar</Button>
              <Button onClick={()=>{handleEndRoom()}} isDanger={true}>Sim, encerrar</Button> 
              </div>          
            </Modal>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>{title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        {questionsLength < 1 ? (
          <div className="noQuestionDiv">
            <img src={empty_question} alt="Nenhuma pergunta por aqui." />
            <span>
              <h3>Nenhuma pergunta por aqui...</h3>
              <p>
                Envie o código desta sala para seus amigos e comece a responder
                perguntas!
              </p>
            </span>
          </div>
        ) : (
          <div className="question-list">
            {questions.map((userQuestion) => {
              console.log(questions.length);
              return (
                <Question
                  key={userQuestion.id}
                  content={userQuestion.content}
                  author={userQuestion.author}
                  isAnswered={userQuestion.isAnswered}
                  isHighlighted={userQuestion.isHighlighted}
                >
                  {!userQuestion.isAnswered && (
                    <>
                      <button
                        className="check-btn"
                        type="button"
                        onClick={() => {
                          handleCheckQuestionAsAnswered(userQuestion.id);
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="12.0003"
                            cy="11.9998"
                            r="9.00375"
                            stroke="#737380"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193"
                            stroke="#737380"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <button
                        className="highlight-btn"
                        type="button"
                        onClick={() => {
                          handleHighlightQuestion(userQuestion.id);
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z"
                            stroke="#737380"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() => {
                      handleDeleteQuestion(userQuestion.id);
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 5.99988H5H21"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </Question>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
export { AdminRoom };
