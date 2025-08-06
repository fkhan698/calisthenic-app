import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { workoutPlans, WorkoutPlan } from '../data/workouts';
import { router } from 'expo-router';

export default function WorkoutsScreen() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  
  const filteredWorkouts = selectedDifficulty === 'All' 
    ? workoutPlans 
    : workoutPlans.filter(workout => workout.difficulty === selectedDifficulty);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#00ff88';
      case 'Intermediate': return '#ffa500';
      case 'Advanced': return '#ff4757';
      default: return '#00ff88';
    }
  };

  const handleWorkoutPress = (workout: WorkoutPlan) => {
    router.push(`/workout/${workout.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Workouts</Text>
          <Text style={styles.subtitle}>Choose a workout to get started</Text>
        </View>

        {/* Difficulty Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {difficulties.map((difficulty) => (
            <TouchableOpacity
              key={difficulty}
              style={[
                styles.filterButton,
                selectedDifficulty === difficulty && styles.filterButtonActive
              ]}
              onPress={() => setSelectedDifficulty(difficulty)}
            >
              <Text style={[
                styles.filterText,
                selectedDifficulty === difficulty && styles.filterTextActive
              ]}>
                {difficulty}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Workout Cards */}
        <View style={styles.workoutsContainer}>
          {filteredWorkouts.map((workout) => (
            <TouchableOpacity
              key={workout.id}
              style={styles.workoutCard}
              onPress={() => handleWorkoutPress(workout)}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleContainer}>
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
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </View>
              
              <Text style={styles.workoutDescription}>{workout.description}</Text>
              
              <View style={styles.cardFooter}>
                <View style={styles.statItem}>
                  <Ionicons name="time-outline" size={16} color="#00ff88" />
                  <Text style={styles.statText}>{workout.duration} min</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="fitness-outline" size={16} color="#00ff88" />
                  <Text style={styles.statText}>{workout.exercises.length} exercises</Text>
                </View>
              </View>

              <View style={styles.tagsContainer}>
                {workout.tags.slice(0, 3).map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
                {workout.tags.length > 3 && (
                  <Text style={styles.moreTagsText}>+{workout.tags.length - 3}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterContent: {
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
  },
  filterButtonActive: {
    backgroundColor: '#00ff88',
    borderColor: '#00ff88',
  },
  filterText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#000',
  },
  workoutsContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  workoutCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitleContainer: {
    flex: 1,
    gap: 8,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  workoutDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#ccc',
  },
  moreTagsText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 20,
  },
});
