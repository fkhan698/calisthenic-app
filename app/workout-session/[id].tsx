import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { workoutPlans, exercises } from '../data/workouts';

export default function WorkoutSessionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [workoutStartTime] = useState(Date.now());
  
  const workout = workoutPlans.find(w => w.id === id);
  
  if (!workout) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Workout not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentWorkoutExercise = workout.exercises[currentExerciseIndex];
  const currentExercise = exercises.find(ex => ex.id === currentWorkoutExercise?.exerciseId);
  const isLastExercise = currentExerciseIndex === workout.exercises.length - 1;
  const isLastSet = currentSet === currentWorkoutExercise?.sets;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (isActive && timeRemaining === 0) {
      setIsActive(false);
      if (isResting) {
        // Rest period finished
        setIsResting(false);
        Alert.alert('Rest Complete!', 'Ready for your next set!');
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining, isResting]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRest = () => {
    if (currentWorkoutExercise) {
      setIsResting(true);
      setTimeRemaining(currentWorkoutExercise.restTime);
      setIsActive(true);
    }
  };

  const completeSet = () => {
    if (!currentWorkoutExercise) return;

    if (currentSet < currentWorkoutExercise.sets) {
      // More sets remaining
      setCurrentSet(prev => prev + 1);
      startRest();
    } else {
      // Exercise complete
      if (isLastExercise) {
        // Workout complete
        finishWorkout();
      } else {
        // Move to next exercise
        setCurrentExerciseIndex(prev => prev + 1);
        setCurrentSet(1);
        setIsResting(false);
        setTimeRemaining(0);
        setIsActive(false);
      }
    }
  };

  const finishWorkout = () => {
    const duration = Math.round((Date.now() - workoutStartTime) / 1000 / 60);
    Alert.alert(
      'Workout Complete! 🎉',
      `Great job! You completed the workout in ${duration} minutes.`,
      [
        {
          text: 'Finish',
          onPress: () => router.push('/(tabs)/progress')
        }
      ]
    );
  };

  const skipExercise = () => {
    Alert.alert(
      'Skip Exercise',
      'Are you sure you want to skip this exercise?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Skip',
          onPress: () => {
            if (isLastExercise) {
              finishWorkout();
            } else {
              setCurrentExerciseIndex(prev => prev + 1);
              setCurrentSet(1);
              setIsResting(false);
              setTimeRemaining(0);
              setIsActive(false);
            }
          }
        }
      ]
    );
  };

  const quitWorkout = () => {
    Alert.alert(
      'Quit Workout',
      'Are you sure you want to quit? Your progress will be lost.',
      [
        { text: 'Continue', style: 'cancel' },
        {
          text: 'Quit',
          style: 'destructive',
          onPress: () => router.back()
        }
      ]
    );
  };

  if (!currentExercise || !currentWorkoutExercise) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Exercise not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={quitWorkout}>
          <Ionicons name="close" size={24} color="#ff4757" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{workout.name}</Text>
        <TouchableOpacity style={styles.headerButton} onPress={skipExercise}>
          <Ionicons name="play-skip-forward" size={24} color="#ffa500" />
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Exercise {currentExerciseIndex + 1} of {workout.exercises.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentExerciseIndex) / workout.exercises.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Current Exercise */}
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseName}>{currentExercise.name}</Text>
        <Text style={styles.exerciseDescription}>{currentExercise.description}</Text>
        
        <View style={styles.setInfo}>
          <Text style={styles.setInfoText}>
            Set {currentSet} of {currentWorkoutExercise.sets}
          </Text>
          {currentWorkoutExercise.reps && (
            <Text style={styles.repInfo}>{currentWorkoutExercise.reps} reps</Text>
          )}
          {currentWorkoutExercise.duration && (
            <Text style={styles.repInfo}>{formatTime(currentWorkoutExercise.duration)}</Text>
          )}
        </View>
      </View>

      {/* Timer */}
      {isResting && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerLabel}>Rest Time</Text>
          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
          </View>
          <TouchableOpacity
            style={styles.skipRestButton}
            onPress={() => {
              setIsActive(false);
              setIsResting(false);
              setTimeRemaining(0);
            }}
          >
            <Text style={styles.skipRestText}>Skip Rest</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Instructions */}
      {!isResting && (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Instructions:</Text>
          {currentExercise.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>{index + 1}.</Text>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Action Button */}
      <View style={styles.footer}>
        {!isResting ? (
          <TouchableOpacity style={styles.completeButton} onPress={completeSet}>
            <Text style={styles.completeButtonText}>
              {isLastSet && isLastExercise 
                ? 'Finish Workout' 
                : isLastSet 
                ? 'Next Exercise' 
                : 'Complete Set'
              }
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.completeButton, styles.restingButton]}
            onPress={() => setIsActive(!isActive)}
          >
            <Ionicons 
              name={isActive ? 'pause' : 'play'} 
              size={24} 
              color="#000" 
            />
            <Text style={styles.completeButtonText}>
              {isActive ? 'Pause' : 'Start'} Rest
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ff88',
  },
  exerciseContainer: {
    padding: 20,
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  setInfo: {
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  setInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ff88',
    marginBottom: 4,
  },
  repInfo: {
    fontSize: 16,
    color: '#ccc',
  },
  timerContainer: {
    alignItems: 'center',
    padding: 20,
  },
  timerLabel: {
    fontSize: 18,
    color: '#ffa500',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#1a1a1a',
    borderWidth: 4,
    borderColor: '#ffa500',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'monospace',
  },
  skipRestButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  skipRestText: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: '600',
  },
  instructionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ff88',
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  instructionNumber: {
    fontSize: 16,
    color: '#00ff88',
    fontWeight: 'bold',
    minWidth: 24,
  },
  instructionText: {
    fontSize: 16,
    color: '#ccc',
    flex: 1,
    lineHeight: 22,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00ff88',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  restingButton: {
    backgroundColor: '#ffa500',
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#ff4757',
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: '#00ff88',
  },
});