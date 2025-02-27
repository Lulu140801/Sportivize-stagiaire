const { Router } = require('express');
const { signup, login } = require('../controllers/authController');
const { refreshAccessToken } = require('../controllers/authController');
const { changePassword } = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh-token', refreshAccessToken);
router.post('/change-password', requireAuth, changePassword);

module.exports = router;
