import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography } from '../../constants';

interface AvatarProps {
  size?: number;
  showShadow?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 170,
  showShadow = true,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size * 0.25,
        },
        showShadow && styles.shadow,
      ]}
    >
      <LinearGradient
        colors={[colors.primary, colors.primaryLight, '#FF6B9D']}
        style={[
          styles.gradient,
          {
            width: size,
            height: size,
            borderRadius: size * 0.25,
          },
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.text, { fontSize: size * 0.35 }]}>OLA</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: typography.fontFamily.bold,
    color: colors.textPrimary,
    letterSpacing: 2,
  },
});
