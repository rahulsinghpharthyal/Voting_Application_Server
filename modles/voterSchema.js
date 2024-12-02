import mongoose from 'mongoose';

const voterSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    hasVoted: {
        type: Boolean,
        default: false,
    }
}, {timpstamps: true})

const Voter = mongoose.model("Voter", voterSchema);

export default Voter;