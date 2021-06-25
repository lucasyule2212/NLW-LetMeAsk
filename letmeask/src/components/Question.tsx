import React from 'react';
import '../styles/question.scss';
import{ReactNode} from'react';


// import { Container } from './styles';
type QuestionProps ={
  content:string;
  author:{
    name:string;
    avatar:string;
  }
  children?:ReactNode;
  isAnswered?:boolean;
  isHighlighted?:boolean;

}
function Question({isAnswered=false,isHighlighted=false,...props}:QuestionProps) {
  return(
    <div className={`question ${isAnswered?"answered":""} ${isHighlighted&&!isAnswered?"highlighted":""}`}>
      <p>{props.content}</p>
      <footer>
        <div className="user-info"> 
          <img src={props.author.avatar} alt={`Avatar ${props.author.name}`}/>
          <span>{props.author.name}</span>
        </div>
        <div>{props.children}</div>
      </footer>
    </div>

  );
}

export {Question};