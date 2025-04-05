// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../../services/api';

// Nueva paleta de colores basada en la imagen
const COLORS = {
  fondoPrincipal: '#000000', // Negro profundo
  contenedorFormulario: 'rgba(0, 0, 0, 0.8)', // Negro con transparencia
  titulo: '#CC9933', // Dorado ocre
  inputFondo: '#1E1E1E', // Negro grisáceo
  inputBorde: '#99FF33', // Verde lima brillante
  inputTexto: '#FFFFFF', // Blanco
  inputPlaceholder: '#AAAAAA', // Gris claro
  botonPrincipalFondo: '#99FF33', // Verde lima
  botonPrincipalTexto: '#000000', // Negro
  botonSecundario: '#CC9933', // Dorado ocre
  botonSecundarioTexto: '#FFFFFF', // Blanco
};

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      Alert.alert('Error', 'El username debe ser un correo válido');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;
    try {
      await api.login(username, password);
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar sesión');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')} // Imagen de fondo
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <TextInput
            placeholder="Correo electrónico"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            keyboardType="email-address"
            placeholderTextColor={COLORS.inputPlaceholder}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              placeholderTextColor={COLORS.inputPlaceholder}
            />
            <TouchableOpacity
              style={styles.showButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.showButtonText}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/register')}
          >
            <Text style={styles.secondaryButtonText}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Oscurece el fondo
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: COLORS.contenedorFormulario,
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.titulo,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: COLORS.inputFondo,
    borderWidth: 1,
    borderColor: COLORS.inputBorde,
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
    fontSize: 18,
    color: COLORS.inputTexto,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputFondo,
    borderWidth: 1,
    borderColor: COLORS.inputBorde,
    borderRadius: 8,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 18,
    color: COLORS.inputTexto,
  },
  showButton: {
    padding: 10,
  },
  showButtonText: {
    color: COLORS.botonSecundario,
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    backgroundColor: COLORS.botonPrincipalFondo,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: COLORS.botonPrincipalTexto,
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.botonSecundario,
    fontSize: 16,
    fontWeight: '600',
  },
});