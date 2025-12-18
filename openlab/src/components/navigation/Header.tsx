import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu, Edit3 } from 'lucide-react-native';
import { colors, typography } from '../../constants';
import { Logo } from '../ui/Logo';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showMenu?: boolean;
  showEdit?: boolean;
  onMenuPress?: () => void;
  onEditPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showLogo = false,
  showMenu = true,
  showEdit = false,
  onMenuPress,
  onEditPress,
}) => {
  return (
    <View style={styles.container}>
      {showMenu && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onMenuPress}
          activeOpacity={0.7}
        >
          <Menu size={28} color={colors.textPrimary} />
        </TouchableOpacity>
      )}
      
      <View style={styles.titleContainer}>
        {showLogo ? (
          <Logo size="medium" />
        ) : (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>
      
      {showEdit ? (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onEditPress}
          activeOpacity={0.7}
        >
          <Edit3 size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconButton} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 64,
  },
  iconButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  title: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
