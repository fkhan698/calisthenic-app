# 🏋️‍♀️ Calisthenics Trainer

A comprehensive mobile application for calisthenics workouts built with React Native and Expo. Train anywhere, anytime with bodyweight exercises designed for all fitness levels.

## ✨ Features

### 🎯 Workout Plans
- **Beginner to Advanced**: Curated workout plans for all skill levels
- **Comprehensive Exercise Library**: 12+ detailed exercises with instructions
- **Progressive Training**: Build strength with structured progressions
- **Equipment Options**: Workouts requiring no equipment or minimal equipment

### ⏱️ Smart Timer
- **Interval Training**: Customizable work and rest periods
- **Exercise Timer**: Built-in timer for time-based exercises
- **Rest Period Management**: Automatic rest timers between sets
- **Audio Alerts**: Timer notifications to keep you focused

### 📊 Progress Tracking
- **Workout Statistics**: Track total workouts, time spent, and streaks
- **Achievement System**: Unlock badges for milestones
- **Weekly Progress**: Visual calendar showing workout completion
- **Performance Insights**: Analyze your fitness journey

### 🎨 Modern UI/UX
- **Dark Theme**: Easy on the eyes for any lighting condition
- **Intuitive Navigation**: Four main tabs for seamless experience
- **Responsive Design**: Optimized for all screen sizes
- **Smooth Animations**: Polished interactions and transitions

## 🏃‍♂️ Workout Categories

### Beginner Workouts
- **Beginner Full Body**: 30-minute introduction to calisthenics
- **Core Crusher**: 20-minute focused core training

### Intermediate Workouts
- **Intermediate Strength**: 45-minute strength building
- **Cardio Blast**: 25-minute high-intensity training
- **Upper Body Focus**: 40-minute upper body specialization

### Advanced Workouts
- **Advanced Skills**: 60-minute skill development
- Master advanced movements like muscle-ups and handstand push-ups

## 🎯 Exercise Library

### Upper Body
- Push-ups (multiple variations)
- Pull-ups and Chin-ups
- Dips (parallel bars or chairs)
- Handstand Push-ups

### Lower Body
- Air Squats and variations
- Pistol Squats (single-leg)
- Jump Squats

### Core & Full Body
- Planks and variations
- Burpees
- Human Flag
- Jumping Jacks

### Advanced Skills
- Muscle-ups
- Handstand movements
- Human Flag progressions

## 📱 App Structure

### Main Tabs
1. **Workouts**: Browse and select workout plans
2. **Timer**: Standalone timer for custom workouts
3. **Progress**: Track statistics and achievements
4. **Profile**: User settings and preferences

### Key Screens
- **Workout Detail**: Comprehensive exercise breakdown
- **Workout Session**: Guided workout with timer and progress
- **Exercise Instructions**: Step-by-step exercise guidance

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd calisthenics-trainer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

### Development Commands

```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Run tests
npm test

# Lint code
npm run lint

# Reset project (if needed)
npm run reset-project
```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#00ff88` - Success, progress, active states
- **Orange**: `#ffa500` - Intermediate difficulty, warnings
- **Red**: `#ff4757` - Advanced difficulty, errors
- **Dark Background**: `#0d0d0d` - Main background
- **Card Background**: `#1a1a1a` - Content containers
- **Border/Divider**: `#333` - Subtle separations

### Typography
- **Headers**: Bold, high contrast white text
- **Body Text**: Medium contrast gray text
- **Accent Text**: Primary green for highlights

## 🔧 Technical Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **UI Components**: Custom components with React Native
- **Icons**: Expo Vector Icons (Ionicons)
- **State Management**: React Hooks (useState, useEffect)
- **Type Safety**: TypeScript

## 📁 Project Structure

```
app/
├── (tabs)/               # Tab navigation screens
│   ├── index.tsx        # Workouts tab
│   ├── timer.tsx        # Timer tab
│   ├── progress.tsx     # Progress tab
│   └── profile.tsx      # Profile tab
├── workout/
│   └── [id].tsx         # Workout detail screen
├── workout-session/
│   └── [id].tsx         # Active workout session
├── data/
│   └── workouts.ts      # Exercise and workout data
├── components/          # Reusable components
└── _layout.tsx          # Root navigation layout
```

## 🎯 Future Enhancements

### Planned Features
- **Custom Workouts**: Create personalized workout routines
- **Video Demonstrations**: Exercise technique videos
- **Social Features**: Share workouts and progress
- **Nutrition Tracking**: Calorie and macro tracking
- **Wearable Integration**: Apple Watch and fitness tracker sync
- **Cloud Sync**: Cross-device progress synchronization

### Technical Improvements
- **Offline Mode**: Download workouts for offline use
- **Push Notifications**: Workout reminders and motivation
- **Analytics**: Detailed workout analytics and insights
- **Performance Optimization**: Improved loading and animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Exercise data curated from calisthenics training principles
- UI/UX inspired by modern fitness applications
- Built with the amazing React Native and Expo ecosystem

---

**Start your calisthenics journey today! 💪**

Download the app and transform your fitness routine with bodyweight training that you can do anywhere, anytime.
