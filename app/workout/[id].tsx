import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { workoutPlans, exercises, WorkoutPlan, Exercise } from '../data/workouts';

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#00ff88';
      case 'Intermediate': return '#ffa500';
      case 'Advanced': return '#ff4757';
      default: return '#00ff88';
    }
  };

  const getExerciseDetails = (exerciseId: string): Exercise | undefined => {
    return exercises.find(ex => ex.id === exerciseId);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`;
  };

  const ExerciseCard = ({ workoutExercise, index }: { 
    workoutExercise: WorkoutPlan['exercises'][0]; 
    index: number;
  }) => {
    const exercise = getExerciseDetails(workoutExercise.exerciseId);
    const isExpanded = expandedExercise === workoutExercise.exerciseId;
    
    if (!exercise) return null;

    return (
      <View style={styles.exerciseCard}>
        <TouchableOpacity
          style={styles.exerciseHeader}
          onPress={() => setExpandedExercise(isExpanded ? null : workoutExercise.exerciseId)}
        >
          <View style={styles.exerciseNumber}>
            <Text style={styles.exerciseNumberText}>{index + 1}</Text>
          </View>
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <View style={styles.exerciseStats}>
              <Text style={styles.exerciseStat}>
                {workoutExercise.sets} sets
              </Text>
              {workoutExercise.reps && (
                <Text style={styles.exerciseStat}>
                  • {workoutExercise.reps} reps
                </Text>
              )}
              {workoutExercise.duration && (
                <Text style={styles.exerciseStat}>
                  • {formatTime(workoutExercise.duration)}
                </Text>
              )}
              <Text style={styles.exerciseStat}>
                • {formatTime(workoutExercise.restTime)} rest
              </Text>
            </View>
          </View>
          <Ionicons 
            name={isExpanded ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.exerciseDetails}>
            <Text style={styles.exerciseDescription}>{exercise.description}</Text>
            
            <View style={styles.targetMuscles}>
              <Text style={styles.detailLabel}>Target Muscles:</Text>
              <View style={styles.musclesList}>
                {exercise.targetMuscles.map((muscle, idx) => (
                  <View key={idx} style={styles.muscleTag}>
                    <Text style={styles.muscleTagText}>{muscle}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.instructions}>
              <Text style={styles.detailLabel}>Instructions:</Text>
              {exercise.instructions.map((instruction, idx) => (
                <View key={idx} style={styles.instructionItem}>
                  <Text style={styles.instructionNumber}>{idx + 1}.</Text>
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ))}
            </View>

            {exercise.tips && exercise.tips.length > 0 && (
              <View style={styles.tips}>
                <Text style={styles.detailLabel}>Tips:</Text>
                {exercise.tips.map((tip, idx) => (
                  <View key={idx} style={styles.tipItem}>
                    <Ionicons name="bulb" size={14} color="#ffa500" />
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  const startWorkout = () => {
    // Navigate to workout session screen (to be implemented)
    router.push(`/workout-session/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Workout Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Workout Overview */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <Text style={styles.workoutTitle}>{workout.name}</Text>
            <View style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(workout.difficulty) + '20' }
            ]}>
              <Text style={[
                styles.difficultyText,
                { color: getDifficultyColor(workout.difficulty) }
              ]}>
                {workout.difficulty}
              </Text>
            </View>
          </View>
          
          <Text style={styles.workoutDescription}>{workout.description}</Text>
          
          <View style={styles.workoutStats}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={20} color="#00ff88" />
              <Text style={styles.statText}>{workout.duration} min</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="fitness-outline" size={20} color="#00ff88" />
              <Text style={styles.statText}>{workout.exercises.length} exercises</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="flame-outline" size={20} color="#00ff88" />
              <Text style={styles.statText}>
                {workout.exercises.reduce((total, ex) => total + ex.sets, 0)} sets
              </Text>
            </View>
          </View>

          <View style={styles.tagsContainer}>
            {workout.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Exercises List */}
        <View style={styles.exercisesSection}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          {workout.exercises.map((workoutExercise, index) => (
            <ExerciseCard
              key={workoutExercise.exerciseId}
              workoutExercise={workoutExercise}
              index={index}
            />
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Start Workout Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton} onPress={startWorkout}>
          <Ionicons name="play" size={24} color="#000" />
          <Text style={styles.startButtonText}>Start Workout</Text>
        </TouchableOpacity>
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
  backButton: {
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
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  overviewCard: {
    margin: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginRight: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  workoutDescription: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 22,
    marginBottom: 20,
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#ccc',
  },
  exercisesSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  exerciseCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00ff88',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  exerciseStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  exerciseStat: {
    fontSize: 14,
    color: '#888',
    marginRight: 8,
  },
  exerciseDetails: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00ff88',
    marginBottom: 8,
  },
  targetMuscles: {
    marginBottom: 16,
  },
  musclesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  muscleTag: {
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  muscleTagText: {
    fontSize: 12,
    color: '#ccc',
  },
  instructions: {
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  instructionNumber: {
    fontSize: 14,
    color: '#00ff88',
    fontWeight: 'bold',
    minWidth: 20,
  },
  instructionText: {
    fontSize: 14,
    color: '#ccc',
    flex: 1,
    lineHeight: 20,
  },
  tips: {
    marginBottom: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#ccc',
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00ff88',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  startButtonText: {
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
  bottomPadding: {
    height: 20,
  },
});