import { FormEvent, useState } from "react";
import { postLogin } from "../utils/api";
import { useDispatch } from "react-redux";
import { setRoleAction, setUserAction } from "../services/slice";
import { useNavigate } from "react-router-dom";

function Login() {
  // Состояния для хранения значений полей и ошибок
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Обработчик отправки формы
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    // Базовая валидация
    if (!username || !password) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    postLogin({ username: username, password: password })
      .then((data) => {
        console.log("Success:", data); 
        dispatch(setUserAction(username));
        dispatch(setRoleAction(data.role))
        if(data.role === "ADMIN") {
          navigate('/admin');
        }
        if(data.role === "USER") {
          navigate('/user');
        }

        setUsername("");
        setPassword("");
        setError("");
      })
      .catch((error) => {
        setError(`${error}`);
      });


  };

  return (
    <div
      style={{
        maxWidth: "300px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Вход</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Вывод ошибки */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username">Логин:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
