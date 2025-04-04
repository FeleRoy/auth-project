import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsCodeValid, getUserSelector } from "../services/slice";
import { postNewPassword } from "../utils/api";

function NewPassword() {
  // Состояния для хранения значений полей и ошибок
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isCodeValid = useSelector(getIsCodeValid);
  const navigate = useNavigate();
  const username = useSelector(getUserSelector);

  // Обработчик отправки формы
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    // Базовая валидация
    if (!password) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    postNewPassword({ username: username, password: password })
      .then((data) => {
        console.log("Success:", data); 
        alert('Новый пароль установлен')
        navigate('/login');
        setPassword("");
        setError("");
      })
      .catch((error) => {
        setError(`${error}`);
      });
  };

  if (!isCodeValid) {
    return <div style={{color: 'red'}}>Не нарушайте правила! Введите сначала код</div>
  }

  return (isCodeValid &&
    <div
      style={{
        maxWidth: "300px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Смена пароля</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Вывод ошибки */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Новый пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", marginTop: "" }}>
          Сменить пароль 
        </button>
      </form>
    </div>
  );
}

export default NewPassword;
