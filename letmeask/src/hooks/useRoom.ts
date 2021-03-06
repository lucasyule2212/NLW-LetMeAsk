import { useEffect } from "react";
import { useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type TypeQuestion={
  id:string;
  author:{
    name:string;
    avatar:string;
    isStar:boolean;
  },
  content:string;
  isAnswered:boolean;
  isHighlighted:boolean;
  likeCount:number;
  likeId:string|undefined;
  
}
type FirebaseQuestions=Record<string,{
  author:{
    name:string;
    avatar:string;
    isStar:boolean;
  },
  content:string;
  isAnswered:boolean;
  isHighlighted:boolean;
  likeCount:number;
  likes:Record<string,{
    authorId:string ;
  }>;
  
}>

function useRoom(roomID:string) {
  const {user}=useAuth();
  const [questions,setQuestions]=useState<TypeQuestion[]>([]);
  const [title,setTitle]=useState('');

  useEffect(()=>{
    const roomRef=database.ref(`rooms/${roomID}`);
     roomRef.on('value',room=>{
      const databaseRoom = room.val();
      
      const firebasequestions:FirebaseQuestions=databaseRoom.questions??{};
  
      const parsedQuestions=Object.entries(firebasequestions).map(([key,value])=>{
        return{
          id:key,
          content:value.content,
          author:value.author,
          isHighlighted:value.isHighlighted,
          isAnswered:value.isAnswered,
          likeCount:Object.values(value.likes??{}).length,
          likeId:Object.entries(value.likes??{}).find(([key,like])=>like.authorId===user?.id)?.[0]
        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions);
      
    })
    return ()=>{
      roomRef.off('value');
    }
  },[roomID,user?.id])

  return({questions,title});
}
export {useRoom}