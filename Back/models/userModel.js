const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    accessToken: { type: String, default: null },
    refreshToken: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Mot de passe incorrect');
    }
    throw Error('Email incorrect');
};

userSchema.methods.updateAccessToken = async function (token) {
    this.accessToken = token;
    await this.save();
};

userSchema.methods.updateRefreshToken = async function (token) {
    this.refreshToken = token;
    await this.save();
};

module.exports = mongoose.model('User', userSchema);
