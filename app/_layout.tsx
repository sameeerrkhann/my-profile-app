import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import Animated, { FadeIn, FadeOut, SlideInLeft } from 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [randomQuote, setRandomQuote] = useState('');
  const [randomFact, setRandomFact] = useState('');

  useEffect(() => {
    SplashScreen.hideAsync();
    generateRandomQuote();
    generateRandomFact();
  }, []);

  const generateRandomQuote = () => {
    const quotes = [
      "The best way to predict the future is to invent it.",
      "Life is what happens when you're busy making other plans.",
      "Success is not the key to happiness. Happiness is the key to success.",
      "You miss 100% of the shots you don’t take.",
      "The only limit to our realization of tomorrow is our doubts of today."
    ];
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const generateRandomFact = () => {
    const facts = [
      "Honey never spoils.",
      "Bananas are berries, but strawberries aren't.",
      "There are more stars in the universe than grains of sand on Earth.",
      "A day on Venus is longer than a year on Venus.",
      "Some cats are allergic to humans."
    ];
    setRandomFact(facts[Math.floor(Math.random() * facts.length)]);
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Background with Vibrant Colors */}
      <View style={[styles.background, colorScheme === 'dark' ? styles.backgroundDark : styles.backgroundLight]}>
        <Animated.View entering={SlideInLeft} exiting={FadeOut} style={styles.headerContainer}>
          <Text style={[styles.headerText, colorScheme === 'dark' ? styles.headerTextDark : styles.headerTextLight]}>
            Welcome to My First Vibrant React Native App!
          </Text>
        </Animated.View>

        <Animated.View entering={FadeIn} style={styles.content}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>

          {/* Entertainment Section */}
          <View style={styles.entertainmentSection}>
            <Text style={styles.entertainmentTitle}>Quote of the Day:</Text>
            <Text style={styles.entertainmentText}>{randomQuote}</Text>
            <Text style={styles.entertainmentTitle}>Did You Know?</Text>
            <Text style={styles.entertainmentText}>{randomFact}</Text>
          </View>
        </Animated.View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundLight: {
    backgroundColor: '#ff7e5f', // A vibrant gradient-like color for light mode
  },
  backgroundDark: {
    backgroundColor: '#333', // A smooth dark color for dark mode
  },
  headerContainer: {
    padding: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerTextLight: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerTextDark: {
    color: '#ff7e5f',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    padding: 20,
  },
  entertainmentSection: {
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  entertainmentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  entertainmentText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
  },
});
