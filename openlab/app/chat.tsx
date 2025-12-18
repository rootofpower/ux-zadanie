import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Drawer } from '../src/components/navigation';
import { ChatBubble, ChatInput, ChatActions } from '../src/components/chat';
import { Avatar } from '../src/components/ui';
import { colors, typography } from '../src/constants';
import { useChatStore, useAuthStore } from '../src/store';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = 300;

export default function ChatScreen() {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayAnimation = useRef(new Animated.Value(0)).current;
  
  const scrollViewRef = useRef<ScrollView>(null);
  
  const { getCurrentChat, sendMessage, isLoading, createChat } = useChatStore();
  const { user } = useAuthStore();
  
  const currentChat = getCurrentChat();
  const messages = currentChat?.messages || [];

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  const openDrawer = () => {
    setIsDrawerOpen(true);
    Animated.parallel([
      Animated.timing(drawerAnimation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(drawerAnimation, {
        toValue: -DRAWER_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsDrawerOpen(false);
    });
  };

  const handleSend = async (message: string) => {
    await sendMessage(message);
  };

  const handleNewChat = () => {
    createChat();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <Header
        showLogo={messages.length === 0}
        title={currentChat?.title || 'New Chat'}
        showMenu
        showEdit={messages.length > 0}
        onMenuPress={openDrawer}
        onEditPress={handleNewChat}
      />

      {/* Chat Content */}
      <View style={styles.chatContainer}>
        {messages.length === 0 ? (
          // Empty state
          <View style={styles.emptyState}>
            <Avatar size={170} />
            <Text style={styles.emptyStateText}>
              How can I help you today?
            </Text>
          </View>
        ) : (
          // Messages list
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesList}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message, index) => (
              <View key={message.id}>
                <ChatBubble message={message} />
                {message.role === 'assistant' && index === messages.length - 1 && (
                  <ChatActions content={message.content} />
                )}
              </View>
            ))}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <View style={styles.loadingDot} />
                <View style={[styles.loadingDot, styles.loadingDotDelayed]} />
                <View style={[styles.loadingDot, styles.loadingDotDelayed2]} />
              </View>
            )}
          </ScrollView>
        )}
      </View>

      {/* Chat Input */}
      <ChatInput onSend={handleSend} disabled={isLoading} />

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: overlayAnimation,
              },
            ]}
          />
        </TouchableWithoutFeedback>
      )}

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: drawerAnimation }],
          },
        ]}
      >
        <Drawer onClose={closeDrawer} userName={user?.name} />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  chatContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyStateText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 32,
    paddingHorizontal: 40,
    lineHeight: 40,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 48,
    gap: 4,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textMuted,
    opacity: 0.5,
  },
  loadingDotDelayed: {
    opacity: 0.7,
  },
  loadingDotDelayed2: {
    opacity: 0.9,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    zIndex: 101,
  },
});
