# Use Node.js for both build and serve
FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV PORT=12000
CMD ["npm", "start"]    