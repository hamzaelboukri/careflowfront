# Guide de Développement CareFlow Frontend

## 🚀 Mode Développement (Hot Reload)

Pour développer sans rebuild à chaque changement:

```bash
# Démarrer le mode développement
docker compose up -d frontend-dev

# Voir les logs
docker logs -f careflow-ehr-frontend-frontend-dev-1

# Arrêter
docker compose down
```

**Accès:** http://localhost:3000

✅ **Tous les changements dans le code sont automatiquement rechargés!**

## 📦 Mode Production

Pour tester la version de production (build):

```bash
docker compose --profile production up -d frontend
```

**Accès:** http://localhost:3001

## 🔄 Commandes Utiles

```bash
# Voir les containers en cours
docker ps

# Voir les logs en temps réel
docker logs -f careflow-ehr-frontend-frontend-dev-1

# Redémarrer après changement dans docker-compose.yml
docker compose restart frontend-dev

# Reconstruire l'image
docker compose build frontend-dev

# Tout supprimer et recommencer
docker compose down
docker compose up -d frontend-dev
```

## 📁 Structure

- **Dockerfile.dev** - Image pour le développement avec Vite
- **Dockerfile** - Image de production avec Nginx
- **docker-compose.yml** - Configuration avec les deux modes

## ⚡ Avantages du Mode Dev

- ✅ Hot Module Replacement (HMR)
- ✅ Pas besoin de rebuild après chaque modification
- ✅ Temps de démarrage rapide
- ✅ Messages d'erreur détaillés dans le navigateur
- ✅ Volumes montés pour synchronisation instantanée

## 📝 Notes

- Le mode dev utilise le port **3000**
- Le mode production utilise le port **3001**
- Les changements dans `package.json` nécessitent un rebuild: `docker compose build frontend-dev`
