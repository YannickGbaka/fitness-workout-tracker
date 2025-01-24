import mongoose from 'mongoose';
import toJSON from '../plugins/toJSON.plugin.ts';


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
        enum: ['pending', 'completed'],
        default: 'pending',
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
const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;