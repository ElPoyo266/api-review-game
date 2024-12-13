# Utiliser une image de base officielle Node.js
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier de configuration pnpm-lock.yaml et package.json
COPY pnpm-lock.yaml package.json ./

# Installer pnpm
RUN npm install -g pnpm

# Installer les dépendances du projet
RUN pnpm install

# Copier le reste des fichiers du projet
COPY . .

# Compiler le projet TypeScript
RUN pnpm build

# Exposer le port sur lequel l'application va tourner
EXPOSE 3000

# Démarrer l'application
CMD ["pnpm", "start"]