const URL = import.meta.env.VITE_BASE_API;



export type TPoliticResponse = {
  success: boolean;
  data: {
    cyrillic: "SET" | "NOT_SET";
    latin: "SET" | "NOT_SET";
    numbers: "SET" | "NOT_SET";
    specialSymbols: "SET" | "NOT_SET";
    unique: "SET" | "NOT_SET";
    upperCase: "SET" | "NOT_SET";
    lowerCase: "SET" | "NOT_SET";
    countOfSymbols: number;
  };
};

// Выполняем запрос
export const postLogin = (data: { username: string; password: string }) =>
  fetch(`${URL}/api/login`, {
    method: "POST", // Метод запроса
    headers: {
      "Content-Type": "application/json", // Указываем, что отправляем JSON
    },
    body: JSON.stringify(data), // Преобразуем данные в JSON-строку
  }).then((response) => {
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  });

export const patchPolicy = (data: {
    cyrillic: "SET" | "NOT_SET";
    latin: "SET" | "NOT_SET";
    numbers: "SET" | "NOT_SET";
    specialSymbols: "SET" | "NOT_SET";
    unique: "SET" | "NOT_SET";
    upperCase: "SET" | "NOT_SET";
    lowerCase: "SET" | "NOT_SET";
    countOfSymbols: number;
  }) =>
  fetch(`${URL}/api/policy`, {
    method: "PATCH", // Метод запроса
    headers: {
      "Content-Type": "application/json", // Указываем, что отправляем JSON
    },
    body: JSON.stringify(data), // Преобразуем данные в JSON-строку
  }).then((response) => {
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  });

export const getPolicy = () =>
  fetch(`${URL}/api/policy`).then((response) => {
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  });

export const postRegistration = (data: {
  username: string;
  password: string;
  role: string;
}) =>
  fetch(`${URL}/`, {
    method: "POST", // Метод запроса
    headers: {
      "Content-Type": "application/json", // Указываем, что отправляем JSON
    },
    body: JSON.stringify(data), // Преобразуем данные в JSON-строку
  }).then((response) => {
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  });

export const postLogs = (data: { username: string; action: string }) =>
  fetch(`${URL}`, {
    method: "POST", // Метод запроса
    headers: {
      "Content-Type": "application/json", // Указываем, что отправляем JSON
    },
    body: JSON.stringify(data), // Преобразуем данные в JSON-строку
  }).then((response) => {
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  });

export const getPassword = () =>
  fetch(`${URL}/api/generatePassword`).then((response) => {
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  });

// .then(data => {
//     console.log('Success:', data); // Обрабатываем успешный ответ
// })
// .catch(error => {
//     console.error('Error:', error); // Обрабатываем ошибку
// });
