import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProgressScreen() {
  // Mock data - in a real app, this would come from storage/database
  const stats = {
    totalWorkouts: 42,
    totalMinutes: 1260,
    currentStreak: 7,
    bestStreak: 12,
    favoriteWorkout: 'Beginner Full Body',
    averageWorkoutTime: 30
  };

  const weeklyData = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: false },
    { day: 'Thu', completed: true },
    { day: 'Fri', completed: true },
    { day: 'Sat', completed: true },
    { day: 'Sun', completed: false },
  ];

  const achievements = [
    { 
      id: 1, 
      title: 'First Workout', 
      description: 'Complete your first workout', 
      unlocked: true,
      icon: 'star'
    },
    { 
      id: 2, 
      title: 'Week Warrior', 
      description: 'Complete 7 workouts', 
      unlocked: true,
      icon: 'calendar'
    },
    { 
      id: 3, 
      title: 'Consistency Champion', 
      description: 'Maintain a 7-day streak', 
      unlocked: true,
      icon: 'flame'
    },
    { 
      id: 4, 
      title: 'Century Club', 
      description: 'Complete 100 workouts', 
      unlocked: false,
      icon: 'trophy'
    },
    { 
      id: 5, 
      title: 'Time Master', 
      description: 'Accumulate 100 hours of training', 
      unlocked: false,
      icon: 'time'
    },
  ];

  const StatCard = ({ title, value, subtitle, icon }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: string;
  }) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Ionicons name={icon as any} size={24} color="#00ff88" />
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>Track your fitness journey</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Workouts"
            value={stats.totalWorkouts}
            subtitle="sessions completed"
            icon="fitness"
          />
          <StatCard
            title="Total Time"
            value={`${Math.floor(stats.totalMinutes / 60)}h ${stats.totalMinutes % 60}m`}
            subtitle="time exercising"
            icon="time"
          />
          <StatCard
            title="Current Streak"
            value={`${stats.currentStreak} days`}
            subtitle="keep it going!"
            icon="flame"
          />
          <StatCard
            title="Best Streak"
            value={`${stats.bestStreak} days`}
            subtitle="personal record"
            icon="trophy"
          />
        </View>

        {/* Weekly Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.weeklyContainer}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <Text style={styles.dayLabel}>{day.day}</Text>
                <View style={[
                  styles.dayIndicator,
                  day.completed ? styles.dayCompleted : styles.dayIncomplete
                ]}>
                  {day.completed && (
                    <Ionicons name="checkmark" size={16} color="#000" />
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement) => (
              <View 
                key={achievement.id} 
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.achievementLocked
                ]}
              >
                <View style={[
                  styles.achievementIcon,
                  achievement.unlocked ? styles.achievementIconUnlocked : styles.achievementIconLocked
                ]}>
                  <Ionicons 
                    name={achievement.icon as any} 
                    size={24} 
                    color={achievement.unlocked ? "#000" : "#666"} 
                  />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={[
                    styles.achievementTitle,
                    !achievement.unlocked && styles.achievementTitleLocked
                  ]}>
                    {achievement.title}
                  </Text>
                  <Text style={[
                    styles.achievementDescription,
                    !achievement.unlocked && styles.achievementDescriptionLocked
                  ]}>
                    {achievement.description}
                  </Text>
                </View>
                {achievement.unlocked && (
                  <Ionicons name="checkmark-circle" size={20} color="#00ff88" />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Additional Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insights</Text>
          <View style={styles.insightsContainer}>
            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>Favorite Workout</Text>
              <Text style={styles.insightValue}>{stats.favoriteWorkout}</Text>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>Average Session</Text>
              <Text style={styles.insightValue}>{stats.averageWorkoutTime} minutes</Text>
            </View>
          </View>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  weeklyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  dayContainer: {
    alignItems: 'center',
    gap: 8,
  },
  dayLabel: {
    fontSize: 12,
    color: '#ccc',
    fontWeight: '500',
  },
  dayIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCompleted: {
    backgroundColor: '#00ff88',
  },
  dayIncomplete: {
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#555',
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    gap: 12,
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementIconUnlocked: {
    backgroundColor: '#00ff88',
  },
  achievementIconLocked: {
    backgroundColor: '#333',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: '#888',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#ccc',
  },
  achievementDescriptionLocked: {
    color: '#666',
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  insightLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  insightValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ff88',
  },
  bottomPadding: {
    height: 20,
  },
});