const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createAccessToken = (id) => {
    return jwt.sign({ id }, 'accessSecretKey', { expiresIn: '1h' });
};

const createRefreshToken = (id) => {
    return jwt.sign({ id }, 'refreshSecretKey', { expiresIn: '1d' });
};

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        res.status(200).json({ message: 'Compte créé avec succès' });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de l\'inscription', error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        await user.updateAccessToken(accessToken);
        await user.updateRefreshToken(refreshToken);

        res.status(200).json({
            user: user._id,
            accessToken,
            refreshToken,
        });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la connexion', error: err.message });
    }
};

const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Token de rafraîchissement manquant' });
    }

    try {
        const decoded = jwt.verify(refreshToken, 'refreshSecretKey');
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Token de rafraîchissement invalide ou expiré' });
        }

        const newAccessToken = createAccessToken(user._id);
        const newRefreshToken = createRefreshToken(user._id);

        user.refreshToken = newRefreshToken;
        await user.save();

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    } catch (err) {
        res.status(403).json({ message: 'Token de rafraîchissement invalide ou expiré', error: err.message });
    }
};

const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const auth = await bcrypt.compare(currentPassword, user.password);
        if (!auth) {
            return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        user.accessToken = null;
        user.refreshToken = null;

        await user.save();

        res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la modification du mot de passe', error: err.message });
    }
};

module.exports = { signup, login, refreshAccessToken, changePassword };
