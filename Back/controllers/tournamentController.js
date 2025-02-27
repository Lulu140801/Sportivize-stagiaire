const Tournament = require('../models/tournamentModel');

const createTournament = async (req, res) => {
    const { name, teams } = req.body;
    const createdBy = req.user.id;

    try {
        const tournament = await Tournament.create({ name, createdBy, teams });
        res.status(201).json(tournament);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la création du tournoi', error: err.message });
    }
};

const getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find().populate('createdBy', 'username');
        res.status(200).json(tournaments);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la récupération des tournois', error: err.message });
    }
};

const getTournamentDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const tournament = await Tournament.findById(id);
        if (!tournament) {
            return res.status(404).json({ message: 'Tournoi non trouvé' });
        }
        res.status(200).json(tournament);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la récupération du tournoi', error: err.message });
    }
};

const updateScore = async (req, res) => {
    const { id } = req.params;
    const { matchId, scoreA, scoreB } = req.body;

    try {
        const tournament = await Tournament.findById(id);
        if (!tournament) {
            return res.status(404).json({ message: 'Tournoi non trouvé' });
        }

        const match = tournament.matches.id(matchId);
        if (match) {
            match.scoreA = scoreA;
            match.scoreB = scoreB;
            await tournament.save();
            res.status(200).json(tournament);
        } else {
            res.status(404).json({ message: 'Match non trouvé' });
        }
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du score', error: err.message });
    }
};

module.exports = { createTournament, getTournaments, getTournamentDetails, updateScore };
