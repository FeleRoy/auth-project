import React, { useState } from "react";
import { patchPolicy } from "../utils/api";

const PasswordGeneratorForm = () => {
  const [options, setOptions] = useState({
    cyrillic: false,
    latin: false,
    numbers: false,
    specialSymbols: false,
    unique: false,
    upperCase: false,
    lowerCase: false,
  });
  const [passwordLength, setPasswordLength] = useState(8);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setOptions({
      ...options,
      [name]: checked,
    });
  };

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(Number(event.target.value));
  };
  type TransformedValue = "SET" | "NOT_SET";

  type TransformedObject<T> = {
    [K in keyof T]: T[K] extends boolean
      ? TransformedValue
      : T[K] extends Array<infer U>
      ? TransformedObject<U>[]
      : T[K] extends object
      ? TransformedObject<T[K]>
      : T[K];
  } & { countOfSymbols: number };

  function transformObject<T extends Record<string, any>>(
    obj: T,
    countOfSymbols: number
  ): TransformedObject<T> {
    function deepCopyAndTransform(value: any): any {
      if (typeof value === "boolean") {
        return value ? "SET" : "NOT_SET";
      } else if (Array.isArray(value)) {
        return value.map(deepCopyAndTransform);
      } else if (value !== null && typeof value === "object") {
        return Object.fromEntries(
          Object.entries(value).map(([key, val]) => [
            key,
            deepCopyAndTransform(val),
          ])
        );
      }
      return value;
    }

    const transformed = deepCopyAndTransform(obj) as TransformedObject<T>;
    return { ...transformed, countOfSymbols };
  }
  const handlePolitic = () => {
    patchPolicy(transformObject(options, passwordLength))
      .then((data) => {
        console.log("Success:", data); // Обрабатываем успешный ответ
        alert("Успешно");
      })
      .catch((error) => {
        console.error("Error:", error); // Обрабатываем ошибку
        alert("Ошибка");
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <h2>Настройки политики</h2>
      <div>
        <label>
          <input
            type="checkbox"
            name="cyrillic"
            checked={options.cyrillic}
            onChange={handleCheckboxChange}
          />
          Кириллица
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="latin"
            checked={options.latin}
            onChange={handleCheckboxChange}
          />
          Латиница
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="numbers"
            checked={options.numbers}
            onChange={handleCheckboxChange}
          />
          Цифры
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="specialSymbols"
            checked={options.specialSymbols}
            onChange={handleCheckboxChange}
          />
          Специальные символы
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="unique"
            checked={options.unique}
            onChange={handleCheckboxChange}
          />
          Уникальные символы
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="upperCase"
            checked={options.upperCase}
            onChange={handleCheckboxChange}
          />
          Верхний регистр
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="lowerCase"
            checked={options.lowerCase}
            onChange={handleCheckboxChange}
          />
          Нижний регистр
        </label>
      </div>
      <div>
        <label>
          Длина пароля:
          <input
            type="number"
            value={passwordLength}
            onChange={handleLengthChange}
            min="1"
            max="255"
          />
        </label>
      </div>
      <button onClick={handlePolitic}>Установить политику</button>
    </div>
  );
};

export default PasswordGeneratorForm;
