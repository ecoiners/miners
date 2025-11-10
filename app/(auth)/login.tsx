import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/theme';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.link}>Don’t have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(8),
  },
  title: {
    color: colors.textLight,
    fontSize: responsiveFontSize(3),
    fontWeight: '700',
    marginBottom: responsiveHeight(4),
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.inputBg,
    color: colors.textLight,
    borderRadius: 10,
    padding: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: responsiveHeight(2),
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  buttonText: {
    color: colors.bgDark,
    fontWeight: '600',
    fontSize: responsiveFontSize(2),
  },
  link: {
    color: colors.accent,
    textAlign: 'center',
  },
});