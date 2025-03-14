import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPassword, postRegistration } from "../utils/api";

function Registration() {
  // Состояния для хранения значений полей и ошибок
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const passwordInput = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Обработчик отправки формы
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    // Базовая валидация
    if (!username || !password) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    // Здесь можно добавить логику для отправки данных на сервер
    postRegistration({ username: username, password: password, role: role })
      .then(() => {
        alert('Успешно!')
        navigate("/login");
        setUsername("");
        setPassword("");
        setError("");
      })
      .catch((error) => {
        setError(`${error}`);
      });

    // Очистка полей и ошибок после успешной отправки
  };
  const generatePassword = () => {
    getPassword()
      .then((data) => {
        setPassword(data);
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
      <h2>Регистрация</h2>
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
          <div style={{ display: "flex" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              ref={passwordInput}
            />
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={generatePassword}
          style={{
            padding: "8px 12px",
            marginBottom: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Сгенерировать
        </button>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="role">Роль:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Войти
        </button>
      </form>
    </div>
  );
}

export default Registration;
