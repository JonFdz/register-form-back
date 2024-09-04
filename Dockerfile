# 1. Imagen base para Node.js
FROM node:20

# 2. Establecer el directorio de trabajo para el backend
WORKDIR /app

# 3. Copiar el código fuente del backend
COPY ./ ./backend

# 4. Instalar las dependencias necesarias para compilar módulos nativos
RUN apt-get update && apt-get install -y python3 make g++ git sqlite3

# 5. Clonar el repositorio del frontend desde GitHub
RUN git clone https://github.com/JonFdz/xic-project-front.git ./frontend

# 6. Instalar dependencias y compilar el frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build --prod

# 7. Mover los archivos estáticos compilados al directorio public del backend
RUN mkdir -p /app/backend/dist/public && cp -r /app/frontend/dist/register-form/browser/* /app/backend/dist/public/

# 8. Instalar dependencias del backend
WORKDIR /app/backend
RUN npm install
RUN npm uninstall sqlite3
RUN npm install --build-from-source sqlite3

# 9. Exponer el puerto en el que correrá el servidor
EXPOSE 3000

# 10. Comando para correr el servidor
CMD ["npx", "ts-node", "src/server.ts"]
