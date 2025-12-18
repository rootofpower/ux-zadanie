import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { colors } from '../../constants';

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
      <Image
        source={require('../../../assets/image.png')}
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.25,
        }}
        resizeMode="cover"
      />
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
});
