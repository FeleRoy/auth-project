import React, {
  useRef,
  useState,
  FormEvent,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import "./CodeInput.css"; // Подключаем стили
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsCodeValid } from "../services/slice";
import { postCheckCode } from "../utils/api";

const CodeInput: React.FC = () => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const setInputRef = (el: HTMLInputElement | null, index: number) => {
    inputsRef.current[index] = el;
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < code.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    postCheckCode({code: code.join("")})
            .then((data) => {
            console.log("Success:", data); 
            alert('Запрос отправлен админу');
            setError("");
            dispatch(setIsCodeValid(true));
            navigate('/new-password');
          })
          .catch((error) => {
            setError(`${error}`);
            navigate(-1);
          });


  };

  return (
    <form onSubmit={handleSubmit} className="code-input-form">
      <h2 className="form-title">Введите код</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Вывод ошибки */}
      <div className="input-container">
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value, index)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(e, index)
            }
            ref={(el) => setInputRef(el, index)}
            className="code-input"
          />
        ))}
      </div>
      <button type="submit" className="submit-btn">
        Подтвердить
      </button>
    </form>
  );
};

export default CodeInput;
