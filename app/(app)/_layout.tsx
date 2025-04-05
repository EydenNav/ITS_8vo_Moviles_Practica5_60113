import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Mis Notas' }} />
      <Stack.Screen name="create-note" options={{ title: 'Crear nota' }} />
    </Stack>
  );
}
