import mongoose from "mongoose";
import toJSON from "../plugins/toJSON.plugin.ts";

const exerciceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    repsOrDuration: {
        type: String,
        required: true,
    },
    notes:{
        type: String,
        required: false
    },
    workoutId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Workout',
        index: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

exerciceSchema.pre('save', function(next){
    if(this.isModified()){
        this.updatedAt = new Date();
    }
    next();
});

exerciceSchema.plugin(toJSON);
const Exercice = mongoose.model('Exercice', exerciceSchema);

export default Exercice;

