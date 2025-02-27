# Sportivize Application

Bienvenue dans l'application **Sportivize**, une solution complète pour organiser des tournois sportifs. Ce projet comprend un frontend développé en Angular et un backend basé sur Express.js.

## Prérequis

Avant de lancer l'application, assurez-vous que les conditions suivantes sont remplies :

1. **Base de données** :
   - La base de données nommée `Sportivize` doit être créée.
   - Un compte utilisateur avec les permissions nécessaires doit être configuré pour accéder à cette base de données.

2. **Docker** :
   - Docker et Docker Compose doivent être installés sur votre machine.

## Instructions de lancement

### 1. Vérification de la base de données

Assurez-vous que la base de données `Sportivize` est prête et accessible. Voici les étapes à suivre :

- Connectez-vous à votre instance MongoDB.
- Vérifiez que la base de données `Sportivize` existe :

  ```bash
  use Sportivize
  db.stats()
  ```

- Assurez-vous qu'un utilisateur dédié à l'application est configuré avec les autorisations appropriées :

  ```bash
  db.createUser({
    user: "username",
    pwd: "password",
    roles: [ { role: "readWrite", db: "Sportivize" } ]
  })
  ```

Remplacez `username` et `password` par les informations d'identification sécurisées de votre choix.

### 2. Lancer l'application

Pour démarrer l'application, exécutez les commandes suivantes :

1. Assurez-vous que le fichier `docker-compose.yml` est correctement configuré pour votre environnement.

2. Lancez les conteneurs avec Docker Compose :

   ```bash
   docker-compose up -d
   ```

3. Vérifiez que le backend fonctionne correctement en accédant à l'API 

Vous devriez obtenir une réponse confirmant que le backend est opérationnel.

### 3. Accéder au frontend

Une fois le backend confirmé comme fonctionnel, accédez à l'application Angular via votre navigateur à l'adresse suivante :

```
http://localhost:4200
```

## Support

Si vous rencontrez des problèmes, veuillez consulter la documentation ou ouvrir un ticket dans le dépôt du projet.