import mongoose from 'mongoose';
import toJSON from '../plugins/toJSON.plugin';
import Status from '../../config/statusEnum';


const workoutSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
        minLength: 3,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    scheduledDate: {
        type: Date,
        required: true,
    },
    status: {
        type : String,
        required: true,
        enum: Object.values(Status),
        default: Status.PENDING,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

workoutSchema.pre('save', function(next){
    if(this.isModified()){
        this.updatedAt = new Date();
    }
    next();
});

workoutSchema.plugin(toJSON);
const workout = mongoose.model('Workout', workoutSchema);

export default workout;