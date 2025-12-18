import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { BackButton } from '../src/components/ui';
import { MicButton } from '../src/components/voice';
import { colors, typography } from '../src/constants';

export default function VoiceScreen() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // Request microphone permission
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleMicPress = async () => {
    if (!hasPermission) {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      setHasPermission(true);
    }

    if (isListening) {
      // Stop listening
      setIsListening(false);
      // Here you would process the audio and get transcription
      // For demo purposes, we'll show a sample transcription
      if (transcription) {
        // Process the transcription with AI
        setTranscription('');
      }
    } else {
      // Start listening
      setIsListening(true);
      // Simulate transcription for demo
      setTimeout(() => {
        setTranscription('Hello, Ola, what weather will be in Kosice today?');
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Back Button */}
        <View style={styles.header}>
          <BackButton onPress={() => router.push('/mode-select')} />
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>
            {isListening ? (
              <>
                <Text style={styles.titleNormal}>Ola is </Text>
                <Text style={styles.titleHighlight}>listening!</Text>
              </>
            ) : (
              'Press the button'
            )}
          </Text>
          <Text style={styles.subtitle}>
            {isListening && transcription
              ? transcription
              : isListening
              ? 'Listening...'
              : 'And start talking, Ola will listen to you until you press the button again.'}
          </Text>
        </View>

        {/* Mic Button */}
        <View style={styles.micSection}>
          <MicButton
            isListening={isListening}
            onPress={handleMicPress}
            size={200}
          />
        </View>

        {/* Page Indicator */}
        <View style={styles.pageIndicator}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
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
    paddingHorizontal: 40,
  },
  header: {
    paddingTop: 12,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  titleNormal: {
    color: colors.textSecondary,
  },
  titleHighlight: {
    color: colors.danger,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  micSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9,
    paddingVertical: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.borderLight,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
});
