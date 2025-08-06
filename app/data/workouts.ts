export interface Exercise {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  targetMuscles: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'reps' | 'time' | 'distance';
  defaultSets?: number;
  defaultReps?: number;
  defaultDuration?: number; // in seconds
  restTime?: number; // in seconds
  tips?: string[];
  variations?: string[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // estimated duration in minutes
  exercises: {
    exerciseId: string;
    sets: number;
    reps?: number;
    duration?: number;
    restTime: number;
  }[];
  tags: string[];
}

export const exercises: Exercise[] = [
  // Beginner Exercises
  {
    id: 'push-up',
    name: 'Push-Up',
    description: 'Classic upper body exercise targeting chest, shoulders, and triceps',
    instructions: [
      'Start in plank position with hands shoulder-width apart',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep your body in a straight line throughout'
    ],
    targetMuscles: ['Chest', 'Triceps', 'Shoulders', 'Core'],
    difficulty: 'Beginner',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    restTime: 60,
    tips: [
      'Keep core engaged throughout',
      'Don\'t let hips sag or pike up',
      'Breathe out as you push up'
    ],
    variations: ['Knee Push-ups', 'Diamond Push-ups', 'Wide-grip Push-ups']
  },
  {
    id: 'air-squat',
    name: 'Air Squat',
    description: 'Fundamental lower body exercise for legs and glutes',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower down as if sitting in a chair',
      'Go down until thighs are parallel to floor',
      'Drive through heels to return to start'
    ],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    difficulty: 'Beginner',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 15,
    restTime: 45,
    tips: [
      'Keep chest up and core tight',
      'Don\'t let knees cave inward',
      'Weight should be on heels'
    ],
    variations: ['Jump Squats', 'Single-leg Squats', 'Sumo Squats']
  },
  {
    id: 'plank',
    name: 'Plank',
    description: 'Isometric core strengthening exercise',
    instructions: [
      'Start in push-up position',
      'Lower to forearms keeping body straight',
      'Hold position engaging core muscles',
      'Breathe normally throughout'
    ],
    targetMuscles: ['Core', 'Shoulders', 'Back'],
    difficulty: 'Beginner',
    type: 'time',
    defaultSets: 3,
    defaultDuration: 30,
    restTime: 30,
    tips: [
      'Keep hips level - don\'t sag or pike',
      'Engage glutes and core',
      'Look down to keep neck neutral'
    ],
    variations: ['Side Plank', 'Plank Up-downs', 'Plank with leg lifts']
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    description: 'Full-body cardio exercise',
    instructions: [
      'Start standing with feet together, arms at sides',
      'Jump feet apart while raising arms overhead',
      'Jump back to starting position',
      'Repeat at steady pace'
    ],
    targetMuscles: ['Full Body', 'Cardiovascular'],
    difficulty: 'Beginner',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 20,
    restTime: 30,
    tips: [
      'Land softly on balls of feet',
      'Keep core engaged',
      'Maintain steady breathing'
    ],
    variations: ['Star Jumps', 'Half Jacks', 'Cross Jacks']
  },

  // Intermediate Exercises
  {
    id: 'pull-up',
    name: 'Pull-Up',
    description: 'Upper body pulling exercise requiring a bar',
    instructions: [
      'Hang from bar with overhand grip',
      'Pull body up until chin clears bar',
      'Lower with control to full hang',
      'Repeat for desired reps'
    ],
    targetMuscles: ['Lats', 'Biceps', 'Rhomboids', 'Middle Traps'],
    difficulty: 'Intermediate',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 5,
    restTime: 90,
    tips: [
      'Engage lats by pulling shoulders down',
      'Don\'t swing or use momentum',
      'Full range of motion is key'
    ],
    variations: ['Chin-ups', 'Wide-grip Pull-ups', 'Commando Pull-ups']
  },
  {
    id: 'dip',
    name: 'Dip',
    description: 'Upper body pushing exercise using parallel bars or chairs',
    instructions: [
      'Support body on parallel bars or sturdy chairs',
      'Lower body by bending elbows',
      'Go down until shoulders are below elbows',
      'Push back up to starting position'
    ],
    targetMuscles: ['Triceps', 'Chest', 'Shoulders'],
    difficulty: 'Intermediate',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 8,
    restTime: 75,
    tips: [
      'Keep body upright',
      'Don\'t go too low if shoulders hurt',
      'Control the descent'
    ],
    variations: ['Ring Dips', 'Bench Dips', 'Single-arm Dips']
  },
  {
    id: 'pistol-squat',
    name: 'Pistol Squat',
    description: 'Single-leg squat requiring balance and strength',
    instructions: [
      'Stand on one leg with other leg extended forward',
      'Lower down on standing leg',
      'Go as low as possible while keeping extended leg off ground',
      'Return to standing position'
    ],
    targetMuscles: ['Quadriceps', 'Glutes', 'Core', 'Calves'],
    difficulty: 'Advanced',
    type: 'reps',
    defaultSets: 2,
    defaultReps: 5,
    restTime: 120,
    tips: [
      'Start with assisted version using support',
      'Focus on balance and control',
      'Build up ankle flexibility'
    ],
    variations: ['Assisted Pistol Squats', 'Box Pistol Squats', 'Shrimp Squats']
  },
  {
    id: 'burpee',
    name: 'Burpee',
    description: 'Full-body exercise combining squat, plank, and jump',
    instructions: [
      'Start standing, drop into squat position',
      'Kick feet back into plank position',
      'Do a push-up (optional)',
      'Jump feet back to squat, then jump up with arms overhead'
    ],
    targetMuscles: ['Full Body', 'Cardiovascular'],
    difficulty: 'Intermediate',
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    restTime: 60,
    tips: [
      'Move with control, not just speed',
      'Keep core engaged throughout',
      'Land softly on jumps'
    ],
    variations: ['Half Burpees', 'Burpee Box Jumps', 'Single-arm Burpees']
  },

  // Advanced Exercises
  {
    id: 'muscle-up',
    name: 'Muscle-Up',
    description: 'Advanced pulling exercise transitioning from pull-up to dip',
    instructions: [
      'Start hanging from bar with overhand grip',
      'Pull up explosively while leaning forward',
      'Transition over the bar getting chest to bar',
      'Press up to support position above bar'
    ],
    targetMuscles: ['Lats', 'Biceps', 'Triceps', 'Chest', 'Shoulders'],
    difficulty: 'Advanced',
    type: 'reps',
    defaultSets: 2,
    defaultReps: 3,
    restTime: 180,
    tips: [
      'Master pull-ups and dips first',
      'Practice the transition movement',
      'Use false grip for better transition'
    ],
    variations: ['Ring Muscle-ups', 'Strict Muscle-ups', 'Kipping Muscle-ups']
  },
  {
    id: 'handstand-push-up',
    name: 'Handstand Push-Up',
    description: 'Inverted push-up performed in handstand position',
    instructions: [
      'Get into handstand position against wall',
      'Lower head toward ground by bending arms',
      'Push back up to full arm extension',
      'Maintain balance throughout'
    ],
    targetMuscles: ['Shoulders', 'Triceps', 'Upper Chest', 'Core'],
    difficulty: 'Advanced',
    type: 'reps',
    defaultSets: 2,
    defaultReps: 5,
    restTime: 150,
    tips: [
      'Master handstand hold first',
      'Start with pike push-ups progression',
      'Use wall for support initially'
    ],
    variations: ['Pike Push-ups', 'Freestanding Handstand Push-ups', 'Ring Handstand Push-ups']
  },
  {
    id: 'human-flag',
    name: 'Human Flag',
    description: 'Advanced core and upper body exercise holding body horizontal',
    instructions: [
      'Grab vertical pole with hands stacked',
      'Lift legs and body to horizontal position',
      'Hold position using core and arm strength',
      'Keep body straight and parallel to ground'
    ],
    targetMuscles: ['Core', 'Lats', 'Shoulders', 'Obliques'],
    difficulty: 'Advanced',
    type: 'time',
    defaultSets: 2,
    defaultDuration: 10,
    restTime: 180,
    tips: [
      'Build up with progressions',
      'Start with bent knee version',
      'Focus on lat engagement'
    ],
    variations: ['Bent Knee Flag', 'Dragon Flag', 'One-arm Flag']
  }
];

export const workoutPlans: WorkoutPlan[] = [
  {
    id: 'beginner-full-body',
    name: 'Beginner Full Body',
    description: 'Perfect starting point for calisthenics beginners',
    difficulty: 'Beginner',
    duration: 30,
    exercises: [
      { exerciseId: 'jumping-jacks', sets: 2, reps: 15, restTime: 30 },
      { exerciseId: 'air-squat', sets: 3, reps: 10, restTime: 45 },
      { exerciseId: 'push-up', sets: 3, reps: 8, restTime: 60 },
      { exerciseId: 'plank', sets: 3, duration: 20, restTime: 30 }
    ],
    tags: ['Full Body', 'Beginner', 'No Equipment']
  },
  {
    id: 'intermediate-strength',
    name: 'Intermediate Strength',
    description: 'Build strength with challenging bodyweight exercises',
    difficulty: 'Intermediate',
    duration: 45,
    exercises: [
      { exerciseId: 'burpee', sets: 3, reps: 8, restTime: 45 },
      { exerciseId: 'pull-up', sets: 4, reps: 6, restTime: 90 },
      { exerciseId: 'dip', sets: 4, reps: 10, restTime: 75 },
      { exerciseId: 'pistol-squat', sets: 3, reps: 4, restTime: 90 },
      { exerciseId: 'plank', sets: 3, duration: 45, restTime: 30 }
    ],
    tags: ['Strength', 'Intermediate', 'Pull-up Bar Required']
  },
  {
    id: 'advanced-skills',
    name: 'Advanced Skills',
    description: 'Master advanced calisthenics movements',
    difficulty: 'Advanced',
    duration: 60,
    exercises: [
      { exerciseId: 'muscle-up', sets: 3, reps: 3, restTime: 180 },
      { exerciseId: 'handstand-push-up', sets: 3, reps: 5, restTime: 150 },
      { exerciseId: 'pistol-squat', sets: 4, reps: 8, restTime: 120 },
      { exerciseId: 'human-flag', sets: 3, duration: 10, restTime: 180 },
      { exerciseId: 'burpee', sets: 2, reps: 15, restTime: 60 }
    ],
    tags: ['Advanced', 'Skills', 'Strength', 'Pull-up Bar Required']
  },
  {
    id: 'cardio-blast',
    name: 'Cardio Blast',
    description: 'High-intensity cardio workout using bodyweight',
    difficulty: 'Intermediate',
    duration: 25,
    exercises: [
      { exerciseId: 'jumping-jacks', sets: 4, reps: 30, restTime: 20 },
      { exerciseId: 'burpee', sets: 4, reps: 12, restTime: 30 },
      { exerciseId: 'air-squat', sets: 4, reps: 25, restTime: 25 },
      { exerciseId: 'push-up', sets: 4, reps: 15, restTime: 30 }
    ],
    tags: ['Cardio', 'HIIT', 'Fat Burn', 'No Equipment']
  },
  {
    id: 'upper-body-focus',
    name: 'Upper Body Focus',
    description: 'Target chest, shoulders, back, and arms',
    difficulty: 'Intermediate',
    duration: 40,
    exercises: [
      { exerciseId: 'push-up', sets: 4, reps: 12, restTime: 60 },
      { exerciseId: 'pull-up', sets: 4, reps: 8, restTime: 90 },
      { exerciseId: 'dip', sets: 4, reps: 10, restTime: 75 },
      { exerciseId: 'plank', sets: 3, duration: 40, restTime: 30 }
    ],
    tags: ['Upper Body', 'Strength', 'Pull-up Bar Required']
  },
  {
    id: 'core-crusher',
    name: 'Core Crusher',
    description: 'Intense core workout for a strong midsection',
    difficulty: 'Intermediate',
    duration: 20,
    exercises: [
      { exerciseId: 'plank', sets: 4, duration: 45, restTime: 30 },
      { exerciseId: 'burpee', sets: 3, reps: 10, restTime: 45 },
      { exerciseId: 'air-squat', sets: 3, reps: 20, restTime: 30 },
      { exerciseId: 'push-up', sets: 3, reps: 10, restTime: 45 }
    ],
    tags: ['Core', 'Abs', 'Strength', 'No Equipment']
  }
];