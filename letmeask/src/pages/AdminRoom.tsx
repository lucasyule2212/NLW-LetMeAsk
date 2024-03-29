import React from "react";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import empty_question from "../assets/images/empty-questions.svg";
import close_room from '../assets/images/close-room.svg'
import { useHistory, useParams } from "react-router-dom";
import "../styles/room.scss";
import '../hooks/useAuth'
import { Question } from "../components/Question";
import { ThemeChanger } from "../components/ThemeChanger";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import { useState } from "react";
import { useEffect } from "react";
import Modal from 'react-modal'

type RoomParams = {
  id: string;
};
const customStyles = {
  overlay:{
    backgroundColor: 'rgba(0, 0, 0, 0.253)'
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
    color:'#29292e!important',
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
  const [modalIsOpenRoom,setModalIsOpenRoom] = useState(false)
  const [modalIsOpenQuestion,setModalIsOpenQuestion] = useState(false)

 
  
  function openModalRoom() {
    setModalIsOpenRoom(true);
  }

  function closeModalRoom() {
    setModalIsOpenRoom(false);
  }
  function openModalQuestion() {
    setModalIsOpenQuestion(true);
  }

  function closeModalQuestion() {
    setModalIsOpenQuestion(false);
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
      await database.ref(`rooms/${roomID}/questions/${questionId}`).remove();
      closeModalQuestion();
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
        <svg className="logo" width="94" height="45" viewBox="0 0 157 75" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 18.999H4.47282V40.2735H0V18.999Z" fill="#29292E"/>
<path d="M22.5872 32.6181C22.5872 32.6755 22.5585 33.0769 22.5012 33.8223H10.8317C11.042 34.7781 11.5389 35.5331 12.3226 36.0874C13.1063 36.6417 14.0812 36.9189 15.2472 36.9189C16.05 36.9189 16.7572 36.8042 17.3689 36.5748C17.9997 36.3264 18.5827 35.9441 19.1179 35.428L21.4977 38.0084C20.0449 39.6714 17.9232 40.5029 15.1325 40.5029C13.3931 40.5029 11.8543 40.1684 10.5163 39.4994C9.1783 38.8113 8.14611 37.8651 7.41975 36.6609C6.6934 35.4566 6.33022 34.0899 6.33022 32.5608C6.33022 31.0507 6.68384 29.6936 7.39108 28.4894C8.11744 27.266 9.10184 26.3199 10.3443 25.6508C11.6059 24.9627 13.0108 24.6187 14.5591 24.6187C16.0691 24.6187 17.4358 24.9436 18.6591 25.5935C19.8825 26.2434 20.8382 27.18 21.5263 28.4033C22.2336 29.6076 22.5872 31.0125 22.5872 32.6181ZM14.5877 28.0019C13.5747 28.0019 12.7241 28.2887 12.0359 28.8621C11.3478 29.4355 10.9273 30.2192 10.7744 31.2132H18.3724C18.2195 30.2384 17.799 29.4642 17.1109 28.8908C16.4227 28.2982 15.5817 28.0019 14.5877 28.0019Z" fill="#29292E"/>
<path d="M34.3673 39.5281C33.9277 39.853 33.3829 40.1015 32.733 40.2735C32.1022 40.4264 31.4332 40.5029 30.726 40.5029C28.891 40.5029 27.4669 40.0346 26.4539 39.098C25.4599 38.1614 24.9629 36.7851 24.9629 34.9692V28.6327H22.5832V25.1921H24.9629V21.4361H29.4357V25.1921H33.2778V28.6327H29.4357V34.9119C29.4357 35.5618 29.5982 36.0683 29.9232 36.4315C30.2672 36.7755 30.7451 36.9476 31.3568 36.9476C32.064 36.9476 32.6661 36.7564 33.1631 36.3741L34.3673 39.5281Z" fill="#29292E"/>
<path d="M55.4862 24.6187C57.4168 24.6187 58.9459 25.1921 60.0737 26.339C61.2206 27.4667 61.794 29.1679 61.794 31.4426V40.2735H57.3212V32.1307C57.3212 30.9074 57.0631 29.9994 56.5471 29.4069C56.0501 28.7952 55.3333 28.4894 54.3967 28.4894C53.3454 28.4894 52.5139 28.8334 51.9022 29.5216C51.2905 30.1906 50.9847 31.1941 50.9847 32.5321V40.2735H46.5119V32.1307C46.5119 29.7031 45.537 28.4894 43.5873 28.4894C42.5552 28.4894 41.7332 28.8334 41.1216 29.5216C40.5099 30.1906 40.2041 31.1941 40.2041 32.5321V40.2735H35.7312V24.848H40.0034V26.6257C40.5768 25.9758 41.2745 25.4788 42.0964 25.1348C42.9375 24.7907 43.855 24.6187 44.8489 24.6187C45.9384 24.6187 46.9228 24.8385 47.8021 25.2781C48.6814 25.6986 49.3886 26.3199 49.9238 27.1418C50.5546 26.339 51.3479 25.7177 52.3036 25.2781C53.2785 24.8385 54.3393 24.6187 55.4862 24.6187Z" fill="#29292E"/>
<path d="M79.9344 32.6181C79.9344 32.6755 79.9057 33.0769 79.8484 33.8223H68.1789C68.3891 34.7781 68.8861 35.5331 69.6698 36.0874C70.4535 36.6417 71.4284 36.9189 72.5944 36.9189C73.3972 36.9189 74.1044 36.8042 74.7161 36.5748C75.3469 36.3264 75.9299 35.9441 76.4651 35.428L78.8448 38.0084C77.3921 39.6714 75.2704 40.5029 72.4797 40.5029C70.7402 40.5029 69.2015 40.1684 67.8635 39.4994C66.5255 38.8113 65.4933 37.8651 64.7669 36.6609C64.0406 35.4566 63.6774 34.0899 63.6774 32.5608C63.6774 31.0507 64.031 29.6936 64.7383 28.4894C65.4646 27.266 66.449 26.3199 67.6915 25.6508C68.953 24.9627 70.3579 24.6187 71.9062 24.6187C73.4163 24.6187 74.783 24.9436 76.0063 25.5935C77.2297 26.2434 78.1854 27.18 78.8735 28.4033C79.5807 29.6076 79.9344 31.0125 79.9344 32.6181ZM71.9349 28.0019C70.9218 28.0019 70.0712 28.2887 69.3831 28.8621C68.695 29.4355 68.2745 30.2192 68.1215 31.2132H75.7196C75.5667 30.2384 75.1462 29.4642 74.458 28.8908C73.7699 28.2982 72.9289 28.0019 71.9349 28.0019Z" fill="#29292E"/>
<path d="M106.086 24.848L103.018 40.2735H98.7747L99.0615 38.7539C97.7808 39.9199 96.2038 40.5029 94.3306 40.5029C93.1264 40.5029 92.0177 40.2257 91.0047 39.6714C89.9916 39.1171 89.1792 38.3238 88.5675 37.2916C87.975 36.2403 87.6787 35.0074 87.6787 33.593C87.6787 31.8918 88.0514 30.3626 88.7969 29.0055C89.5615 27.6292 90.5937 26.5588 91.8935 25.7942C93.1933 25.0105 94.6269 24.6187 96.1943 24.6187C98.5645 24.6187 100.237 25.3928 101.212 26.9411L101.613 24.848H106.086ZM95.7068 36.8042C96.5861 36.8042 97.3698 36.594 98.0579 36.1734C98.7461 35.7338 99.2813 35.1317 99.6636 34.3671C100.046 33.6025 100.237 32.7233 100.237 31.7293C100.237 30.678 99.9216 29.8465 99.2908 29.2348C98.6792 28.6232 97.819 28.3173 96.7104 28.3173C95.8311 28.3173 95.0474 28.5372 94.3593 28.9768C93.6711 29.3973 93.1359 29.9899 92.7536 30.7544C92.3713 31.519 92.1802 32.3983 92.1802 33.3923C92.1802 34.4436 92.486 35.2751 93.0977 35.8867C93.7285 36.4984 94.5982 36.8042 95.7068 36.8042Z" fill="url(#paint0_linear)"/>
<path d="M111.632 40.5029C110.294 40.5029 109.023 40.3595 107.819 40.0728C106.634 39.767 105.707 39.3751 105.038 38.8973L106.758 35.6573C107.427 36.097 108.239 36.4506 109.195 36.7182C110.17 36.9858 111.145 37.1196 112.119 37.1196C113.133 37.1196 113.888 36.9954 114.385 36.7469C114.882 36.4793 115.13 36.1065 115.13 35.6287C115.13 35.2464 114.91 34.9692 114.471 34.7972C114.031 34.6252 113.324 34.4436 112.349 34.2524C111.24 34.0422 110.323 33.8128 109.596 33.5643C108.889 33.3158 108.268 32.9144 107.733 32.3601C107.217 31.7866 106.959 31.0125 106.959 30.0376C106.959 28.3364 107.666 27.008 109.08 26.0523C110.514 25.0965 112.387 24.6187 114.7 24.6187C115.77 24.6187 116.812 24.7333 117.825 24.9627C118.838 25.1921 119.698 25.5075 120.406 25.9089L118.8 29.1775C117.538 28.3938 116.019 28.0019 114.241 28.0019C113.266 28.0019 112.521 28.1453 112.005 28.432C111.508 28.7187 111.259 29.0819 111.259 29.5216C111.259 29.923 111.479 30.2192 111.919 30.4104C112.358 30.5824 113.094 30.7736 114.127 30.9838C115.216 31.1941 116.105 31.4235 116.793 31.6719C117.5 31.9013 118.112 32.2932 118.628 32.8475C119.144 33.4018 119.402 34.1568 119.402 35.1126C119.402 36.8329 118.676 38.1614 117.223 39.098C115.79 40.0346 113.926 40.5029 111.632 40.5029Z" fill="url(#paint1_linear)"/>
<path d="M131.595 31.5573L136.899 40.2735H131.71L128.04 34.2811L125.316 36.5462L124.57 40.2735H120.097L124.341 18.999H128.814L126.434 30.8978L133.831 24.848H139.652L131.595 31.5573Z" fill="url(#paint2_linear)"/>
<path d="M81.0842 15.9024V8.73438C81.0842 5.56737 83.6516 3 86.8186 3H148.463C151.63 3 154.198 5.56737 154.198 8.73438V48.8751C154.198 52.0421 151.63 54.6094 148.463 54.6094H138.428L141.782 70.2603C142.075 71.6282 140.436 72.563 139.408 71.6141L124.092 57.4766H86.8186C83.6516 57.4766 81.0842 54.9093 81.0842 51.7422V48.8751" stroke="url(#paint3_linear)" stroke-width="4.30079"/>
<defs>
<linearGradient id="paint0_linear" x1="87.6787" y1="18.999" x2="99.7578" y2="53.1105" gradientUnits="userSpaceOnUse">
<stop stop-color="#485BFF"/>
<stop offset="1" stop-color="#FF59F8"/>
</linearGradient>
<linearGradient id="paint1_linear" x1="87.6787" y1="18.999" x2="99.7578" y2="53.1105" gradientUnits="userSpaceOnUse">
<stop stop-color="#485BFF"/>
<stop offset="1" stop-color="#FF59F8"/>
</linearGradient>
<linearGradient id="paint2_linear" x1="87.6787" y1="18.999" x2="99.7578" y2="53.1105" gradientUnits="userSpaceOnUse">
<stop stop-color="#485BFF"/>
<stop offset="1" stop-color="#FF59F8"/>
</linearGradient>
<linearGradient id="paint3_linear" x1="81.0842" y1="3" x2="141.295" y2="77.547" gradientUnits="userSpaceOnUse">
<stop stop-color="#485BFF"/>
<stop offset="1" stop-color="#FF59F8"/>
</linearGradient>
</defs>
</svg>
            <ThemeChanger/>
          <div>
            <RoomCode code={roomID} />
            <Button
              onClick={openModalRoom}
              isOutlined
            >
              Encerrar sala
            </Button>
            <Modal
            isOpen={modalIsOpenRoom}
            onRequestClose={closeModalRoom}
            style={customStyles}
            >        
            <img src={close_room} alt="close room"/>
              <h2>Encerrar sala</h2>
              <p>Tem certeza que você deseja encerrar esta sala?</p>
              <div style={{display:'flex', gap:'16px',marginTop:'16px'}}>
              <Button onClick={closeModalRoom} isMuted={true} >Cancelar</Button>
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
                    onClick={openModalQuestion}
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
                  <Modal
                    isOpen={modalIsOpenQuestion}
                    onRequestClose={closeModalQuestion}
                    style={customStyles}
                  >        
                    <img src={close_room} alt="close room"/>
                    <h2>Deletar pergunta</h2>
                    <p>Tem certeza que você deseja deletar esta pergunta?</p>
                    <div style={{display:'flex', gap:'16px',marginTop:'16px'}}>
                    <Button onClick={closeModalQuestion} isMuted={true} >Cancelar</Button>
                    <Button onClick={()=>{handleDeleteQuestion(userQuestion.id)}} isDanger={true}>Sim, deletar</Button> 
                    </div>          
                  </Modal>
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
