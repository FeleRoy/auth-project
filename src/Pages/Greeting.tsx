import { useNavigate } from "react-router-dom";

export default function Greeting() {
    const navigate = useNavigate();
    const divButtons=
     {  
        display: "flex",
        gap: '10px',
     }; 


    return(
        <>
        <h1>Вход</h1>
        <div style={divButtons}>
        <button onClick={()=>{navigate('/login')}}>Войти</button>
        <button onClick={()=>{navigate('/registration')}}>Зарегистрироваться</button>
        </div>
        </>
    );
}