# Запуск проекта
В корневой папке нужно создать файл .env с содержимым `VITE_BASE_API=https://api.example.com`
## Команды
```
npm install
```
```
npm run dev - для разработки
```
```
npm run preview - для просмотра
```
```
npm run build - для сборки проекта (появится папка dist)
```

## DOCKER

```
docker build -t auth-project-front .
```

```
docker run -p 8080:80 auth-project-front
```