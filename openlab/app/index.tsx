import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bluetooth } from 'lucide-react-native';
import { Button, Logo, Divider, Avatar } from '../src/components/ui';
import { colors, typography } from '../src/constants';
import { useAuthStore } from '../src/store';

export default function StartScreen() {
  const router = useRouter();
  const { signInAsGuest } = useAuthStore();

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleSingleUse = () => {
    signInAsGuest();
    router.push('/language-select');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo and Avatar Section */}
        <View style={styles.headerSection}>
          <Avatar size={280} />
          <View style={styles.logoContainer}>
            <Logo size="large" />
            <Text style={styles.subtitle}>Your AI Voice Assistant</Text>
          </View>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsSection}>
          <Button
            title="Sign In"
            onPress={handleSignIn}
            variant="primary"
          />
          
          <Divider text="or" />
          
          <Button
            title="Single-use"
            onPress={handleSingleUse}
            variant="secondary"
            icon={<Bluetooth size={20} color={colors.textPrimary} />}
            style={styles.singleUseButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 12,
    gap: 4,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
  },
  buttonsSection: {
    gap: 8,
    paddingBottom: 60,
  },
  singleUseButton: {
    backgroundColor: colors.accent,
    borderColor: colors.accentDark,
  },
});
