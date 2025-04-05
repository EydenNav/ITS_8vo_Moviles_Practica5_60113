// app/_layout.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { getAuthToken } from '../services/auth';  // Aquí importamos las funciones de autenticación
import { Text, View } from 'react-native';

export default function Layout() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getAuthToken();  // Verificamos si hay un token guardado
      if (!token) {
        setIsAuthenticated(false);  // Si no hay token, redirigimos a login
        router.replace('/login');
      } else {
        setIsAuthenticated(true);  // Si hay token, permitimos el acceso
      }
    };

    checkAuth();
  }, [router]);

  return (
    <Stack>
      {isAuthenticated ? (
        // Aquí van las pantallas protegidas
        <Stack.Screen name="index" />
      ) : (
        <Text>Cargando...</Text>
      )}
    </Stack>
  );
}

