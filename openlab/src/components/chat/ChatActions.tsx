import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Copy, ThumbsUp, ThumbsDown } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import { colors } from '../../constants';

interface ChatActionsProps {
  content: string;
  onFeedback?: (type: 'positive' | 'negative') => void;
}

export const ChatActions: React.FC<ChatActionsProps> = ({
  content,
  onFeedback,
}) => {
  const handleCopy = async () => {
    await Clipboard.setStringAsync(content);
  };

  return (
    <View style={styles.container}>
      <View style={styles.feedbackContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onFeedback?.('positive')}
          activeOpacity={0.7}
        >
          <ThumbsUp size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onFeedback?.('negative')}
          activeOpacity={0.7}
        >
          <ThumbsDown size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleCopy}
        activeOpacity={0.7}
      >
        <Copy size={20} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingLeft: 48,
  },
  feedbackContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
});
