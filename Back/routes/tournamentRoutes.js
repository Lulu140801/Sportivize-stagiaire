const { Router } = require('express');
const { createTournament, getTournaments, getTournamentDetails, updateScore } = require('../controllers/tournamentController');

const router = Router();

router.post('/create', createTournament);
router.get('/list', getTournaments);
router.get('/details/:id', getTournamentDetails);
router.post('/update-score/:id', updateScore);

module.exports = router;
