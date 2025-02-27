const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teams: [{ type: String }],
    matches: [{
        teamA: { type: String },
        teamB: { type: String },
        scoreA: { type: Number, default: 0 },
        scoreB: { type: Number, default: 0 }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Tournament', tournamentSchema);
