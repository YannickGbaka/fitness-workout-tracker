import Exercice from "../mongoose/schemas/exercice.schema.ts";
import Workout from "../mongoose/schemas/workout.schema.ts";
import { Types } from "mongoose";

interface ExerciseTrend {
    exerciseName: string;
    totalCount: number;
    averageRepsOrDuration: string;
    frequency: number; // times per week
    mostCommonRepsOrDuration: string;
}

interface WorkoutTrend {
    averageExercisesPerWorkout: number;
    mostPopularExercises: string[];
    totalExercises: number;
    exerciseDistribution: Record<string, number>;
}

const getExerciseTrends = async (userId: string, startDate: Date, endDate: Date): Promise<ExerciseTrend[]> => {
    const workouts = await Workout.find({
        userId: new Types.ObjectId(userId),
        scheduledDate: {
            $gte: startDate,
            $lte: endDate
        }
    });

    const workoutIds = workouts.map(w => w._id);
    const exercises = await Exercice.find({
        workoutId: { $in: workoutIds }
    });

    // Group exercises by name
    const exercisesByName = exercises.reduce((acc, exercise) => {
        if (!acc[exercise.name]) {
            acc[exercise.name] = [];
        }
        acc[exercise.name].push(exercise);
        return acc;
    }, {} as Record<string, typeof exercises>);

    // Calculate trends for each exercise
    const trends: ExerciseTrend[] = Object.entries(exercisesByName).map(([name, exerciseList]) => {
        const totalCount = exerciseList.length;
        const daysInRange = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const weeksInRange = daysInRange / 7;

        // Calculate frequency per week
        const frequency = totalCount / weeksInRange;

        // Calculate most common reps/duration
        const repsCount = exerciseList.reduce((acc, ex) => {
            acc[ex.repsOrDuration] = (acc[ex.repsOrDuration] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const mostCommonRepsOrDuration = Object.entries(repsCount)
            .sort(([,a], [,b]) => b - a)[0][0];

        return {
            exerciseName: name,
            totalCount,
            averageRepsOrDuration: mostCommonRepsOrDuration, // Using most common as average for string values
            frequency: Number(frequency.toFixed(2)),
            mostCommonRepsOrDuration
        };
    });

    return trends;
};

const getWorkoutAnalytics = async (userId: string, startDate: Date, endDate: Date): Promise<WorkoutTrend> => {
    const workouts = await Workout.find({
        userId: new Types.ObjectId(userId),
        scheduledDate: {
            $gte: startDate,
            $lte: endDate
        }
    });

    const workoutIds = workouts.map(w => w._id);
    const exercises = await Exercice.find({
        workoutId: { $in: workoutIds }
    });

    // Calculate average exercises per workout
    const averageExercisesPerWorkout = exercises.length / workouts.length;

    // Calculate exercise distribution
    const exerciseDistribution = exercises.reduce((acc, exercise) => {
        acc[exercise.name] = (acc[exercise.name] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Get most popular exercises
    const mostPopularExercises = Object.entries(exerciseDistribution)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([name]) => name);

    return {
        averageExercisesPerWorkout: Number(averageExercisesPerWorkout.toFixed(2)),
        mostPopularExercises,
        totalExercises: exercises.length,
        exerciseDistribution
    };
};

export {
    getExerciseTrends,
    getWorkoutAnalytics,
    type ExerciseTrend,
    type WorkoutTrend
}; 