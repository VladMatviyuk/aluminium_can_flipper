# Этап 1: Сборка приложения
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Этап 2: Сервинг статики через nginx
FROM nginx:alpine

# Копируем кастомную конфигурацию nginx (опционально)
COPY nginx.conf /etc/nginx/nginx.conf

# Удаляем дефолтный сайт
RUN rm -rf /usr/share/nginx/html/*

# Копируем собранные файлы из предыдущего этапа
COPY --from=builder /app/build /usr/share/nginx/html

# Экспонируем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]