import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../constants';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const fontSize = size === 'small' ? 24 : size === 'medium' ? 32 : 44;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize }]}>
        Open<Text style={styles.highlight}>Lab</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    fontFamily: typography.fontFamily.bold,
    color: colors.textPrimary,
  },
  highlight: {
    color: colors.primaryLight,
  },
});
