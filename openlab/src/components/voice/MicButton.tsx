import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Mic } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../constants';

interface MicButtonProps {
  isListening: boolean;
  onPress: () => void;
  size?: number;
}

export const MicButton: React.FC<MicButtonProps> = ({
  isListening,
  onPress,
  size = 200,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    if (isListening) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 500, easing: Easing.ease }),
          withTiming(1, { duration: 500, easing: Easing.ease })
        ),
        -1,
        true
      );
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.6, { duration: 500, easing: Easing.ease }),
          withTiming(0.3, { duration: 500, easing: Easing.ease })
        ),
        -1,
        true
      );
    } else {
      scale.value = withTiming(1);
      opacity.value = withTiming(0.3);
    }
  }, [isListening]);

  const animatedGlowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, { width: size, height: size }]}
    >
      {/* Glow effect */}
      <Animated.View
        style={[
          styles.glow,
          { width: size, height: size, borderRadius: size / 2 },
          animatedGlowStyle,
        ]}
      />
      
      {/* Main button */}
      <LinearGradient
        colors={isListening ? [colors.danger, '#FF3366'] : [colors.primary, colors.primaryLight]}
        style={[
          styles.button,
          { width: size * 0.85, height: size * 0.85, borderRadius: size / 2 },
        ]}
      >
        <View style={styles.iconContainer}>
          <Mic size={size * 0.4} color={colors.textPrimary} strokeWidth={1.5} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    backgroundColor: colors.primary,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
