// services/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar el token de autenticación
export const saveAuthToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('@auth_token', token);  // Guardamos el token en el almacenamiento local
  } catch (error) {
    console.error('Error al guardar el token:', error);
  }
};

// Obtener el token de autenticación
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('@auth_token');  // Obtenemos el token del almacenamiento local
  } catch (error) {
    console.error('Error al obtener el token:', error);
    return null;
  }
};

// Eliminar el token de autenticación (por ejemplo, cuando el usuario cierra sesión)
export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('@auth_token');  // Eliminamos el token del almacenamiento local
  } catch (error) {
    console.error('Error al eliminar el token:', error);
  }
};
