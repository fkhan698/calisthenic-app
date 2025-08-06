import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="workout/[id]" 
        options={{ headerShown: false, presentation: 'card' }} 
      />
      <Stack.Screen 
        name="workout-session/[id]" 
        options={{ headerShown: false, presentation: 'fullScreenModal' }} 
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
