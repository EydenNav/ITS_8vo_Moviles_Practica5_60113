// app/register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../../services/api';

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      Alert.alert('Error', 'El username debe ser un correo válido');
      return false;
    }
    if (password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateRegister()) return;
    try {
      await api.register(username, password);
      Alert.alert('Éxito', 'Cuenta registrada correctamente');
      router.replace('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      Alert.alert('Error', error.message || 'Hubo un problema al intentar registrar la cuenta');
    }
  };

  return (
    <ImageBackground source={require('../../assets/background2.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Crear Cuenta</Text>
          <TextInput
            placeholder="Correo electrónico"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            keyboardType="email-address"
            placeholderTextColor="#FFE0C9"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              placeholderTextColor="#FFE0C9"
            />
            <TouchableOpacity
              style={styles.showButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.showButtonText}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.secondaryButtonText}>¿Ya tienes cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(30, 31, 26, 0.85)', // Negro con leve tono verde y opacidad
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Negro profundo con transparencia
    borderRadius: 16,
    padding: 25,
    shadowColor: '#99FF33', // Verde lima brillante
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanco
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 224, 201, 0.2)', // Tono piel claro con transparencia
    borderWidth: 1,
    borderColor: '#99FF33', // Verde lima
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: '#FFFFFF', // Blanco
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 224, 201, 0.2)',
    borderWidth: 1,
    borderColor: '#99FF33',
    borderRadius: 12,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    color: '#FFFFFF',
  },
  showButton: {
    padding: 10,
  },
  showButtonText: {
    color: '#FF6FA5', // Rosa vibrante
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#99FF33', // Verde lima brillante
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#000000', // Negro
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#CC9933', // Dorado ocre
    fontSize: 14,
    fontWeight: '600',
  },
});
