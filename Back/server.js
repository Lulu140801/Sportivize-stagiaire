const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
const { requireAuth } = require('./middleware/authMiddleware');
const environment = require('./environement');

const app = express();
app.use(express.json());
app.use(cors());

async function connectDB() {
    try {
      const mongoURI = process.env.MONGO_URI || environment.MONGO_URI;
      
      await mongoose.connect(mongoURI);
      
      console.log('Connecté à MongoDB');
    } catch (err) {
      console.error('Erreur de connexion à MongoDB:', err);
      process.exit(1);
    }
  }
  

async function startServer() {
  await connectDB();

  app.use('/api/auth', authRoutes);
  app.use('/api/tournaments', requireAuth, tournamentRoutes);

  const PORT = process.env.PORT || environment.PORT;
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
}

startServer();