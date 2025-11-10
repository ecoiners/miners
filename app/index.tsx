import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/theme';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>E100</Text>
      <ActivityIndicator size="large" color={colors.accent} />
      <Text style={styles.text}>Loading decentralized rewards...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: colors.accent,
    fontSize: responsiveFontSize(6),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(3),
  },
  text: {
    color: colors.textMuted,
    marginTop: responsiveHeight(2),
  },
});