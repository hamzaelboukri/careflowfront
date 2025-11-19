# CareFlow EHR Frontend

[![CI/CD Pipeline](https://github.com/hamzaelboukri/careflowfront/actions/workflows/deploy.yml/badge.svg)](https://github.com/hamzaelboukri/careflowfront/actions/workflows/deploy.yml)
[![Continuous Integration](https://github.com/hamzaelboukri/careflowfront/actions/workflows/ci.yml/badge.svg)](https://github.com/hamzaelboukri/careflowfront/actions/workflows/ci.yml)
[![Docker Build](https://github.com/hamzaelboukri/careflowfront/actions/workflows/docker.yml/badge.svg)](https://github.com/hamzaelboukri/careflowfront/actions/workflows/docker.yml)

Application web de gestion des rendez-vous et dossiers médicaux pour cliniques.

## 🚀 Démarrage Rapide

### Avec Docker (Production)
```bash
docker compose up --build -d frontend
# Accéder à http://localhost:3000
```

### Avec l'image Docker pré-construite
```bash
docker pull ghcr.io/hamzaelboukri/careflowfront:latest
docker run -p 3000:80 ghcr.io/hamzaelboukri/careflowfront:latest
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
- `/register` - Inscription (Patient)
- `/dashboard` - Tableau de bord (rôle-based)
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
npm run lint     # Run ESLint
```

## 🐳 Docker
```bash
docker compose logs frontend     # Voir les logs
docker compose down              # Arrêter
docker compose up --build -d frontend  # Rebuild
```

## 🚀 CI/CD Pipeline

Le projet utilise GitHub Actions pour l'intégration et le déploiement continus :

### Workflows Actifs
- **CI/CD Pipeline** : Build, test et déploiement automatique sur push vers master
- **Continuous Integration** : Validation du code sur les pull requests
- **Docker Build** : Construction et publication automatique des images Docker
- **Release** : Création automatique de releases avec tags

### Déploiement
Les déploiements sont automatiques lors du push vers `master` :
- ✅ GitHub Pages (par défaut)
- ✅ Docker images (GitHub Container Registry)
- 📦 Vercel/Netlify (optionnel - voir `.github/workflows/README.md`)

Pour plus d'informations sur la configuration CI/CD, consultez [.github/workflows/README.md](.github/workflows/README.md)

## 📝 Créer une Release

Pour créer une nouvelle release :
```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions créera automatiquement :
- Une release GitHub avec changelog
- Archives du build (tar.gz et zip)
- Image Docker taguée

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

Les CI checks doivent passer avant le merge.

## 📄 License

Ce projet est sous licence privée.
