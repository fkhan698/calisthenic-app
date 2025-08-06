import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

  const SettingItem = ({ title, subtitle, onPress, rightComponent }: {
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent || (
        onPress && <Ionicons name="chevron-forward" size={20} color="#666" />
      )}
    </TouchableOpacity>
  );

  const StatItem = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.statItem}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Manage your account and preferences</Text>
        </View>

        {/* User Info */}
        <View style={styles.section}>
          <View style={styles.userInfoCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={48} color="#000" />
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Fitness Enthusiast</Text>
              <Text style={styles.userEmail}>user@example.com</Text>
              <TouchableOpacity style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.statsContainer}>
            <StatItem label="Member Since" value="Jan 2024" />
            <StatItem label="Current Level" value="Intermediate" />
            <StatItem label="Favorite Exercise" value="Push-ups" />
            <StatItem label="Weekly Goal" value="5 workouts" />
          </View>
        </View>

        {/* Workout Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Preferences</Text>
          <View style={styles.settingsContainer}>
            <SettingItem
              title="Default Workout Duration"
              subtitle="30 minutes"
              onPress={() => {}}
            />
            <SettingItem
              title="Preferred Difficulty"
              subtitle="Intermediate"
              onPress={() => {}}
            />
            <SettingItem
              title="Rest Time Between Sets"
              subtitle="60 seconds"
              onPress={() => {}}
            />
            <SettingItem
              title="Workout Reminders"
              subtitle="Daily at 6:00 PM"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.settingsContainer}>
            <SettingItem
              title="Notifications"
              subtitle="Get workout reminders and tips"
              rightComponent={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#333', true: '#00ff8850' }}
                  thumbColor={notificationsEnabled ? '#00ff88' : '#666'}
                />
              }
            />
            <SettingItem
              title="Sound Effects"
              subtitle="Timer sounds and feedback"
              rightComponent={
                <Switch
                  value={soundEnabled}
                  onValueChange={setSoundEnabled}
                  trackColor={{ false: '#333', true: '#00ff8850' }}
                  thumbColor={soundEnabled ? '#00ff88' : '#666'}
                />
              }
            />
            <SettingItem
              title="Dark Mode"
              subtitle="Use dark theme"
              rightComponent={
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ false: '#333', true: '#00ff8850' }}
                  thumbColor={darkModeEnabled ? '#00ff88' : '#666'}
                />
              }
            />
          </View>
        </View>

        {/* Support & Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Info</Text>
          <View style={styles.settingsContainer}>
            <SettingItem
              title="Help & FAQ"
              subtitle="Get answers to common questions"
              onPress={() => {}}
            />
            <SettingItem
              title="Contact Support"
              subtitle="Need help? We're here for you"
              onPress={() => {}}
            />
            <SettingItem
              title="Privacy Policy"
              subtitle="How we protect your data"
              onPress={() => {}}
            />
            <SettingItem
              title="Terms of Service"
              subtitle="App usage terms and conditions"
              onPress={() => {}}
            />
            <SettingItem
              title="About"
              subtitle="Version 1.0.0"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingsContainer}>
            <SettingItem
              title="Export Data"
              subtitle="Download your workout history"
              onPress={() => {}}
            />
            <SettingItem
              title="Reset Progress"
              subtitle="Clear all workout data"
              onPress={() => {}}
            />
            <TouchableOpacity style={styles.dangerButton}>
              <Text style={styles.dangerButtonText}>Sign Out</Text>
            </TouchableOpacity>
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
  userInfoCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00ff88',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  userDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  editProfileButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  editProfileText: {
    fontSize: 14,
    color: '#00ff88',
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#ccc',
  },
  statValue: {
    fontSize: 14,
    color: '#00ff88',
    fontWeight: '600',
  },
  settingsContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  dangerButton: {
    backgroundColor: '#ff4757',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  bottomPadding: {
    height: 20,
  },
});