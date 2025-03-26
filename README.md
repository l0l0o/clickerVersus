# ClickerVersus - Application Mobile

Une application mobile de clicker développée avec Expo et React Native, avec fonctionnalités de sauvegarde Firebase.

## 📋 Prérequis

- [Node.js](https://nodejs.org/) (version recommandée : 16.x ou supérieure)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## 🛠️ Technologies utilisées

- [Expo](https://expo.dev/) - Framework pour applications React Native
- [React Native](https://reactnative.dev/) - Framework mobile
- [Firebase](https://firebase.google.com/) - Base de données et stockage cloud
- [TypeScript](https://www.typescriptlang.org/) - Typage statique pour JavaScript

## 📦 Dépendances principales

- `expo` - Framework principal
- `expo-router` - Routage de l'application
- `firebase` - Intégration Firebase pour la persistance des données
- `react-native-reanimated` - Animations avancées
- `@react-native-async-storage/async-storage` - Stockage local
- `expo-haptics` - Retours haptiques

## 🚀 Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/l0l0o/clickerVersus
   cd clickerVersus
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

## 🎮 Démarrer l'application

Pour lancer l'application en mode développement :

```bash
npx expo start
```

Cela ouvrira une interface dans votre navigateur avec plusieurs options pour exécuter l'application :

- Appuyez sur `a` pour ouvrir sur un émulateur Android
- Appuyez sur `i` pour ouvrir sur un simulateur iOS
- Scannez le QR code avec l'application Expo Go sur votre appareil mobile

## 📱 Fonctionnalités

- Jeu de clicker avec accumulation de ressources
- Sauvegarde des données sur Firebase
- Interface utilisateur réactive et animations
- Système de progression et d'améliorations

## 🏗️ Structure du projet

- `/app` - Composants principaux et logique de l'application
- `/app/clicker` - Fonctionnalité principale du jeu
- `/connection` - Configuration Firebase
- `/constants` - Constants et configurations
- `/hooks` - Custom React hooks
- `/assets` - Images et ressources

## 🔧 Configuration de Firebase

L'application utilise Firebase pour le stockage des données. La configuration est présente dans le fichier `connection/database.ts`.

## 📝 Scripts npm disponibles

- `npm start` - Démarrer l'application
- `npm run android` - Démarrer sur émulateur Android
- `npm run ios` - Démarrer sur simulateur iOS
- `npm run web` - Démarrer en version web
- `npm test` - Exécuter les tests
- `npm run lint` - Exécuter le linter
