import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://murder-turner-come-arc.trycloudflare.com/api';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

const getAuthToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token || '';  // Retorna el token, si está presente, o una cadena vacía
};

export const api = {
  getTareas: async (): Promise<Tarea[]> => {
    const token = await getAuthToken();  // Obtener el token desde AsyncStorage
    try {
      const response = await fetch(`${API_BASE_URL}/tareas`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) throw new Error('Error fetching tareas');
      return await response.json();
    } catch (error) {
      console.error('Error fetching tareas:', error);
      throw error;
    }
  },

  getTarea: async (id: number): Promise<Tarea> => {
    const token = await getAuthToken();  // Obtener el token desde AsyncStorage
    try {
      const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) throw new Error(`Error fetching tarea ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching tarea ${id}:`, error);
      throw error;
    }
  },

  createTarea: async (tarea: Omit<Tarea, 'id'>): Promise<Tarea> => {
    const token = await getAuthToken();  // Obtener el token desde AsyncStorage
    try {
      const response = await fetch(`${API_BASE_URL}/tareas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '', // Añadir el token al header
        },
        body: JSON.stringify(tarea),
      });
      if (!response.ok) throw new Error('Error creating tarea');
      return await response.json();
    } catch (error) {
      console.error('Error creating tarea:', error);
      throw error;
    }
  },

  updateTarea: async (id: number, tarea: Partial<Tarea>): Promise<Tarea> => {
    const token = await getAuthToken();  // Obtener el token desde AsyncStorage
    try {
      const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(tarea),
      });
      if (!response.ok) throw new Error(`Error updating tarea ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error updating tarea ${id}:`, error);
      throw error;
    }
  },

  deleteTarea: async (id: number): Promise<void> => {
    const token = await getAuthToken();  // Obtener el token desde AsyncStorage
    try {
      const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) throw new Error(`Error deleting tarea ${id}`);
    } catch (error) {
      console.error(`Error deleting tarea ${id}:`, error);
      throw error;
    }
  },

  login: async (username: string, password: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  },

  register: async (username: string, password: string) => {  // Cambiamos "email" por "username"
    try {
      const requestBody = { username, password };  // Ya está correcto para el backend
      console.log('Enviando datos de registro:', requestBody);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      const responseData = await response.json();
      console.log('Respuesta del servidor:', responseData);
  
      if (!response.ok) {
        console.log('Código de estado HTTP:', response.status);
        throw new Error(responseData.error || 'Error en el registro');
      }
  
      return responseData;
    } catch (error) {
      console.error('Error en la solicitud de registro:', error);
      throw new Error(error.message || 'Error en el registro');
    }
  },
  
};
