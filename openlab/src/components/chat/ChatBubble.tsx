import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography } from '../../constants';
import { Message } from '../../types';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <View style={styles.userContainer}>
        <View style={styles.userBubble}>
          <Text style={styles.userText}>{message.content}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.assistantContainer}>
      <View style={styles.avatarContainer}>
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          style={styles.avatar}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.avatarText}>O</Text>
        </LinearGradient>
      </View>
      <View style={styles.assistantContent}>
        <Text style={styles.assistantText}>{message.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  userBubble: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxWidth: '80%',
  },
  userText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  assistantContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 18,
    color: colors.textPrimary,
  },
  assistantContent: {
    flex: 1,
  },
  assistantText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.textPrimary,
    lineHeight: 24,
  },
});
