import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, BackButton } from '../src/components/ui';
import { colors, typography, languages } from '../src/constants';
import { useAppStore } from '../src/store';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

export default function LanguageSelectScreen() {
  const router = useRouter();
  const { setLanguage, completeOnboarding } = useAppStore();
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Default to English (index 4)
  const defaultIndex = languages.findIndex(l => l.code === 'en');
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(index, languages.length - 1));
    setSelectedIndex(clampedIndex);
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(index, languages.length - 1));
    
    // Snap to nearest item
    scrollViewRef.current?.scrollTo({
      y: clampedIndex * ITEM_HEIGHT,
      animated: true,
    });
  };

  const handleContinue = () => {
    setLanguage(languages[selectedIndex]);
    router.push('/mode-select');
  };

  const getItemStyle = (index: number) => {
    const distance = Math.abs(index - selectedIndex);
    
    if (distance === 0) {
      return {
        opacity: 1,
        fontSize: typography.fontSize.lg,
        fontFamily: typography.fontFamily.bold,
        color: colors.primary,
      };
    } else if (distance === 1) {
      return {
        opacity: 0.5,
        fontSize: typography.fontSize.lg,
        fontFamily: typography.fontFamily.regular,
        color: colors.textPrimary,
      };
    } else {
      return {
        opacity: 0.3,
        fontSize: typography.fontSize.lg,
        fontFamily: typography.fontFamily.regular,
        color: colors.textPrimary,
      };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <View style={styles.header}>
        <BackButton />
      </View>

      <View style={styles.content}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Choose Your Language</Text>
          <Text style={styles.subtitle}>Select your preferred language</Text>
        </View>

        {/* Language Picker */}
        <View style={styles.pickerContainer}>
          <View style={styles.selectionHighlight} />
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onScroll={handleScroll}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            scrollEventThrottle={16}
          >
            {/* Top padding */}
            <View style={{ height: ITEM_HEIGHT * 2 }} />
            
            {languages.map((language, index) => {
              const itemStyle = getItemStyle(index);
              return (
                <View key={language.code} style={styles.languageItem}>
                  <Text
                    style={[
                      styles.languageText,
                      {
                        opacity: itemStyle.opacity,
                        fontSize: itemStyle.fontSize,
                        fontFamily: itemStyle.fontFamily,
                        color: itemStyle.color,
                      },
                    ]}
                  >
                    {language.nativeName}
                  </Text>
                </View>
              );
            })}
            
            {/* Bottom padding */}
            <View style={{ height: ITEM_HEIGHT * 2 }} />
          </ScrollView>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonSection}>
          <Button
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            style={styles.continueButton}
          />
        </View>

        {/* Page Indicator */}
        <View style={styles.pageIndicator}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
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
  header: {
    paddingTop: 12,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
  pickerContainer: {
    height: PICKER_HEIGHT,
    marginTop: 40,
    position: 'relative',
  },
  selectionHighlight: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT + 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: `${colors.primary}4D`, // 30% opacity
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
  },
  languageItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageText: {
    textAlign: 'center',
  },
  buttonSection: {
    marginTop: 'auto',
  },
  continueButton: {
    borderRadius: 16,
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
