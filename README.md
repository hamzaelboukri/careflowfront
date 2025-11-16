# CareFlow EHR Frontend

Application web de gestion des rendez-vous et dossiers médicaux pour cliniques.

## 🚀 Démarrage Rapide

### Avec Docker (Production)
```bash
docker compose up --build -d frontend
# Accéder à http://localhost:3000
```

### Développement Local
```bash
npm install
npm run dev
# Accéder à http://localhost:5173
```

## 🛠️ Stack Technique
- React 19 + TypeScript
- Vite
- React Router v6
- Chakra UI v3
- Zustand + React Query
- Axios

## 📁 Structure
```
src/
├── components/      # Composants réutilisables
├── layouts/         # MainLayout, AuthLayout
├── lib/             # API config (axios)
├── pages/           # Routes de l'app
├── stores/          # Zustand (auth)
└── App.tsx          # Routage principal
```

## 🔐 Rôles
- Admin, Médecin, Infirmier, Patient, Pharmacien, Labo

## 🌐 Routes Principales
- `/` - Accueil
- `/login` - Connexion
- `/dashboard` - Tableau de bord
- `/appointments` - Rendez-vous
- `/patients` - Patients
- `/prescriptions` - Prescriptions

## 🔌 API Backend
Configure `VITE_API_URL` (défaut: `http://localhost:3010`)

## 📦 Scripts
```bash
npm run dev      # Dev server
npm run build    # Production build
npm run preview  # Preview build
```

## 🐳 Docker
```bash
docker compose logs frontend     # Voir les logs
docker compose down              # Arrêter
docker compose up --build -d frontend  # Rebuild
```
