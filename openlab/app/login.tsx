import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input, Logo, Divider, Avatar } from '../src/components/ui';
import { colors, typography } from '../src/constants';
import { useAuthStore } from '../src/store';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validate()) return;
    
    setLoading(true);
    try {
      await signIn(email, password);
      router.replace('/language-select');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      router.replace('/language-select');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in with Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.headerSection}>
          <Avatar size={170} />
          <View style={styles.logoContainer}>
            <Logo size="medium" />
            <Text style={styles.subtitle}>Your AI Voice Assistant</Text>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={errors.email}
          />
          
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
            containerStyle={styles.passwordInput}
          />
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsSection}>
          <Button
            title="Sign In"
            onPress={handleSignIn}
            variant="primary"
            loading={loading}
          />
          
          <Divider text="or" />
          
          <Button
            title="Continue with Google"
            onPress={handleGoogleSignIn}
            variant="secondary"
            disabled={loading}
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
    gap: 20,
  },
  logoContainer: {
    alignItems: 'center',
    gap: 4,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
  },
  formSection: {
    marginTop: 40,
  },
  passwordInput: {
    marginTop: 16,
  },
  buttonsSection: {
    marginTop: 'auto',
    gap: 8,
    paddingBottom: 40,
  },
});
