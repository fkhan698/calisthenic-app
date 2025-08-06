import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TimerScreen() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timerType, setTimerType] = useState<'exercise' | 'rest'>('exercise');
  const [exerciseTime, setExerciseTime] = useState(45);
  const [restTime, setRestTime] = useState(15);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (isActive && seconds === 0) {
      // Timer finished
      if (timerType === 'exercise') {
        setTimerType('rest');
        setSeconds(restTime);
        Alert.alert('Exercise Complete!', 'Take a rest break.');
      } else {
        setTimerType('exercise');
        setSeconds(exerciseTime);
        Alert.alert('Rest Complete!', 'Ready for next exercise!');
      }
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, timerType, exerciseTime, restTime]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(timerType === 'exercise' ? exerciseTime : restTime);
    setIsActive(false);
  };

  const startExercise = () => {
    setTimerType('exercise');
    setSeconds(exerciseTime);
    setIsActive(true);
  };

  const startRest = () => {
    setTimerType('rest');
    setSeconds(restTime);
    setIsActive(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const adjustTime = (type: 'exercise' | 'rest', increment: number) => {
    if (type === 'exercise') {
      const newTime = Math.max(5, exerciseTime + increment);
      setExerciseTime(newTime);
      if (timerType === 'exercise' && !isActive) {
        setSeconds(newTime);
      }
    } else {
      const newTime = Math.max(5, restTime + increment);
      setRestTime(newTime);
      if (timerType === 'rest' && !isActive) {
        setSeconds(newTime);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout Timer</Text>
        <Text style={styles.subtitle}>Stay focused and track your intervals</Text>
      </View>

      {/* Current Timer Display */}
      <View style={styles.timerContainer}>
        <View style={[
          styles.timerCircle,
          { borderColor: timerType === 'exercise' ? '#00ff88' : '#ffa500' }
        ]}>
          <Text style={[
            styles.timerTypeText,
            { color: timerType === 'exercise' ? '#00ff88' : '#ffa500' }
          ]}>
            {timerType === 'exercise' ? 'EXERCISE' : 'REST'}
          </Text>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
          <Text style={styles.timerLabel}>
            {timerType === 'exercise' ? 'Work Hard!' : 'Recover'}
          </Text>
        </View>
      </View>

      {/* Timer Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlButton, styles.playButton]}
          onPress={toggle}
        >
          <Ionicons 
            name={isActive ? 'pause' : 'play'} 
            size={32} 
            color="#000" 
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.controlButton, styles.resetButton]}
          onPress={reset}
        >
          <Ionicons name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Quick Start Buttons */}
      <View style={styles.quickStartContainer}>
        <TouchableOpacity
          style={[styles.quickStartButton, styles.exerciseButton]}
          onPress={startExercise}
        >
          <Ionicons name="fitness" size={24} color="#000" />
          <Text style={styles.quickStartText}>Start Exercise</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.quickStartButton, styles.restButton]}
          onPress={startRest}
        >
          <Ionicons name="cafe" size={24} color="#000" />
          <Text style={styles.quickStartText}>Start Rest</Text>
        </TouchableOpacity>
      </View>

      {/* Time Adjustments */}
      <View style={styles.adjustmentsContainer}>
        <View style={styles.adjustmentRow}>
          <Text style={styles.adjustmentLabel}>Exercise Time</Text>
          <View style={styles.adjustmentControls}>
            <TouchableOpacity
              style={styles.adjustButton}
              onPress={() => adjustTime('exercise', -5)}
            >
              <Ionicons name="remove" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.adjustmentValue}>{exerciseTime}s</Text>
            <TouchableOpacity
              style={styles.adjustButton}
              onPress={() => adjustTime('exercise', 5)}
            >
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.adjustmentRow}>
          <Text style={styles.adjustmentLabel}>Rest Time</Text>
          <View style={styles.adjustmentControls}>
            <TouchableOpacity
              style={styles.adjustButton}
              onPress={() => adjustTime('rest', -5)}
            >
              <Ionicons name="remove" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.adjustmentValue}>{restTime}s</Text>
            <TouchableOpacity
              style={styles.adjustButton}
              onPress={() => adjustTime('rest', 5)}
            >
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    padding: 20,
  },
  header: {
    marginBottom: 40,
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
  timerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  timerCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  timerTypeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'monospace',
  },
  timerLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 40,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#00ff88',
  },
  resetButton: {
    backgroundColor: '#333',
  },
  quickStartContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 40,
  },
  quickStartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    gap: 8,
  },
  exerciseButton: {
    backgroundColor: '#00ff88',
  },
  restButton: {
    backgroundColor: '#ffa500',
  },
  quickStartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  adjustmentsContainer: {
    gap: 20,
  },
  adjustmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 12,
  },
  adjustmentLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  adjustmentControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  adjustButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adjustmentValue: {
    fontSize: 16,
    color: '#00ff88',
    fontWeight: 'bold',
    minWidth: 40,
    textAlign: 'center',
  },
});