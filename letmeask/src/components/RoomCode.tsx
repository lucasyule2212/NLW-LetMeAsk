import React from 'react';

import copyImage from '../assets/images/copy.svg'
import '../styles/roomCode.scss'

// import { Container } from './styles';
type RoomCodeProps={
  code:string
}
function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }
  return(
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImage} alt="copiar código"/>
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}

export {RoomCode} ;