import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { X, Edit3, LogOut, Settings, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { colors, typography } from '../../constants';
import { useChatStore, useAuthStore } from '../../store';

interface DrawerProps {
  onClose: () => void;
  userName?: string;
}

export const Drawer: React.FC<DrawerProps> = ({ onClose, userName = 'User' }) => {
  const router = useRouter();
  const { chats, createChat, setCurrentChat } = useChatStore();
  const { signOut } = useAuthStore();

  const handleNewChat = () => {
    createChat();
    onClose();
    router.push('/chat');
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChat(chatId);
    onClose();
    router.push('/chat');
  };

  const handleLogout = () => {
    signOut();
    onClose();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <View style={styles.closeButtonInner}>
            <X size={20} color={colors.textPrimary} />
          </View>
        </TouchableOpacity>
        
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Welcome,{'\n'}dear {userName}.
          </Text>
        </View>
        
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <User size={28} color={colors.textPrimary} />
          </View>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* New Chat */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleNewChat}
          activeOpacity={0.7}
        >
          <Edit3 size={24} color={colors.textPrimary} />
          <Text style={styles.menuItemText}>New chat</Text>
        </TouchableOpacity>
        
        {/* Chat History */}
        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={styles.menuItem}
            onPress={() => handleSelectChat(chat.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.chatItemText} numberOfLines={1}>
              {chat.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.divider} />
      
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <LogOut size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.footerButton}
          activeOpacity={0.7}
        >
          <Settings size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    width: 300,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 60,
    paddingBottom: 20,
  },
  closeButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonInner: {
    width: 28,
    height: 28,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  welcomeText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.textPrimary,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.textSecondary,
    marginHorizontal: 13,
  },
  content: {
    flex: 1,
    paddingVertical: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  menuItemText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.textPrimary,
  },
  chatItemText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.textPrimary,
    paddingLeft: 36,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  footerButton: {
    padding: 8,
  },
});
