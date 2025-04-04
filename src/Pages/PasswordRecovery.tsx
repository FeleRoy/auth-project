import { FormEvent, useState } from "react";
import { postGenerateCode, postPasswordRecovery } from "../utils/api";
import { useNavigate } from "react-router-dom";

function PasswordRecovery() {
  // Состояния для хранения значений полей и ошибок
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Обработчик отправки формы
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    // Базовая валидация
    if (!username) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    postPasswordRecovery({ username: username, action: "hey" })
      .then((data) => {
        console.log("Success:", data); 
        alert('Запрос отправлен админу');
        setUsername("");
        setError("");
        postGenerateCode();
        navigate('/code-check');
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
      <h2>Запрос на новый пароль</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Вывод ошибки */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username">Ваш логин:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", marginTop: "" }}>
          Сделать запрос админу
        </button>
      </form>
    </div>
  );
}

export default PasswordRecovery;
