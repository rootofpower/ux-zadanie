import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut } from 'lucide-react-native';
import { Button, Logo, Divider, Avatar } from '../src/components/ui';
import { colors, typography } from '../src/constants';
import { useAppStore, useAuthStore } from '../src/store';

export default function ModeSelectScreen() {
  const router = useRouter();
  const { setMode, completeOnboarding } = useAppStore();
  const { signOut } = useAuthStore();

  const handleVoiceAssistant = () => {
    setMode('voice');
    completeOnboarding();
    router.replace('/voice');
  };

  const handleChatAssistant = () => {
    setMode('chat');
    completeOnboarding();
    router.replace('/chat');
  };

  const handleLogout = () => {
    signOut();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.headerSection}>
          <Avatar size={170} />
          <View style={styles.logoContainer}>
            <Logo size="medium" />
            <Text style={styles.subtitle}>Which mode you want to use?</Text>
          </View>
        </View>

        {/* Mode Selection Buttons */}
        <View style={styles.modeSection}>
          <Button
            title="Voice Assistant"
            onPress={handleVoiceAssistant}
            variant="primary"
          />
          
          <Divider text="or" />
          
          <Button
            title="Chat Assistant"
            onPress={handleChatAssistant}
            variant="secondary"
          />
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <Button
            title="Log out"
            onPress={handleLogout}
            variant="danger"
            icon={<LogOut size={20} color={colors.textPrimary} />}
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
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 12,
    gap: 12,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
  },
  modeSection: {
    marginTop: 80,
    gap: 8,
  },
  logoutSection: {
    marginTop: 'auto',
    paddingBottom: 60,
  },
});
