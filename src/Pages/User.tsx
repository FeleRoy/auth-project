import { useSelector } from "react-redux";
import { postLogs } from "../utils/api";
import { getUserSelector } from "../services/slice";

export const User = () =>{
    const username = useSelector(getUserSelector);
    const handleButton = (message: string)=>{
        postLogs({username: username, action: message});
    };

    return(
    <>
    <h1>Страница для пользователя</h1>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <button onClick={()=>{handleButton('нажата кнопка 1')}}>Кнопка 1</button>
    <button onClick={()=>{handleButton('нажата кнопка 2')}}>Кнопка 2</button>
    </div>
    </>);
}