
# Usa una imagen base de Node.js más robusta
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json para instalar las dependencias
COPY package*.json ./

# Configura npm para ignorar conflictos de dependencias de pares
RUN npm config set legacy-peer-deps true

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que se ejecuta la aplicación de React
EXPOSE 3000

# Comando para iniciar la aplicación en modo de desarrollo
CMD ["npm", "start"]
