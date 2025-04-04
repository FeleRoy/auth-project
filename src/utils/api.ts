//const URL = import.meta.env.VITE_BASE_API; //- раскомментировать если работает env
const URL = 'http://localhost:8080/api'; 
const postLoginAddress = '/login';
const patchPolicyAddress = '/policy';
const getPolicyAddress = '/policy';
const postRegistrationAddress = '/registration/user';
const postLogsAddress = '/log/event';
const getPasswordAddress = '/generatePassword';
const postPasswordRecoveryAddress = '/log/recoveryPassword'; // отправить запрос на изменение пароля
const postCheckCodeAddress = '/checkCode' // отправить код
const postNewPasswordAddress = '/updatePassword' //отправить новый пароль
const postGenerateCodeAddress = '/code'

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


export const postGenerateCode = () => 
  fetch(`${URL}${postGenerateCodeAddress}`, {
    method: "POST", // Метод запроса
    headers: {
      "Content-Type": "application/json", // Указываем, что отправляем JSON
    },
  }).then((response) => {
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  });

export const postCheckCode = (data: {code: string}) => 
  fetch(`${URL}${postCheckCodeAddress}`, {
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


export const postNewPassword = (data: { username: string; password: string }) =>
  fetch(`${URL}${postNewPasswordAddress}`, {
    method: "PUT", // Метод запроса
    headers: {
      "Content-Type": "application/json", // Указываем, что отправляем JSON
    },
    body: JSON.stringify(data), // Преобразуем данные в JSON-строку
  }).then(async (response) => {
    const result = await response.json();
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${result.message}`);
    }
    return response.json();
  });


export const postLogin = (data: { username: string; password: string }) =>
  fetch(`${URL}${postLoginAddress}`, {
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

export const postPasswordRecovery = (data: { username: string; action: string }) =>
  fetch(`${URL}${postPasswordRecoveryAddress}`, {
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
  fetch(`${URL}${patchPolicyAddress}`, {
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
  fetch(`${URL}${getPolicyAddress}`).then((response) => {
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
  fetch(`${URL}${postRegistrationAddress}`, {
    method: "POST", // Метод запроса
    headers: {
      "Content-Type": "application/json", // Указываем, что отправляем JSON
    },
    body: JSON.stringify(data), // Преобразуем данные в JSON-строку
  }).then(async (response) => {
    const result = await response.json();
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${result.message}`);
    }
    return response.json();
  });

export const postLogs = (data: { username: string; action: string }) =>
  fetch(`${URL}${postLogsAddress}`, {
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
  fetch(`${URL}${getPasswordAddress}`).then((response) => {
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
