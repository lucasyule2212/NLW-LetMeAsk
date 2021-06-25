
import { ButtonHTMLAttributes } from "react";
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>&{
  isOutlined?:boolean;
  isMuted?:boolean;
  isDanger?:boolean;
};

function Button({isOutlined = false,isMuted=false,isDanger=false,...props}:ButtonProps) {

  return <button className={
    `button ${isOutlined?'outlined':''} ${isMuted?'muted-btn':''} ${isDanger?'danger-btn':''}`
  } {...props}></button>;
}

export { Button };
