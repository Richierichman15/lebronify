import { StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';

export default function GlazeScreen() {
  const colorScheme = useColorScheme();
  
  // Mock data for Glaze recommendations - unique AI-enhanced mixes
  const recommendations = [
    { 
      id: '1', 
      title: 'Your Energy Mix', 
      description: 'Upbeat tracks to boost your energy', 
      cover: 'https://via.placeholder.com/200',
      gradient: ['#FC5C7D', '#6A82FB']
    },
    { 
      id: '2', 
      title: 'Calm Focus', 
      description: 'Concentration-enhancing instrumentals', 
      cover: 'https://via.placeholder.com/200',
      gradient: ['#43cea2', '#185a9d']
    },
    { 
      id: '3', 
      title: 'Nostalgia Trip', 
      description: 'Tracks that remind you of good times', 
      cover: 'https://via.placeholder.com/200',
      gradient: ['#c31432', '#240b36']
    },
    { 
      id: '4', 
      title: 'Mood Lifter', 
      description: 'Songs chosen to improve your mood', 
      cover: 'https://via.placeholder.com/200',
      gradient: ['#11998e', '#38ef7d']
    },
  ];
  
  const [selectedMood, setSelectedMood] = useState('happy');

  const moods = [
    { id: 'happy', label: 'Happy', emoji: '😊' },
    { id: 'chill', label: 'Chill', emoji: '😌' },
    { id: 'energetic', label: 'Energetic', emoji: '🔥' },
    { id: 'focus', label: 'Focus', emoji: '🧠' },
    { id: 'workout', label: 'Workout', emoji: '💪' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Glaze</Text>
          <Text style={styles.headerSubtitle}>AI-enhanced music for your mood</Text>
        </View>
        
        {/* Mood selector */}
        <View style={styles.moodContainer}>
          <Text style={styles.sectionTitle}>How are you feeling today?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moodsRow}>
            {moods.map(mood => (
              <TouchableOpacity 
                key={mood.id} 
                style={[
                  styles.moodButton, 
                  selectedMood === mood.id && styles.selectedMoodButton,
                  { borderColor: Colors[colorScheme ?? 'light'].tint }
                ]}
                onPress={() => setSelectedMood(mood.id)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={[
                  styles.moodLabel, 
                  selectedMood === mood.id && { color: Colors[colorScheme ?? 'light'].tint }
                ]}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <Text style={styles.sectionTitle}>Recommended for you</Text>
        {recommendations.map((item) => (
          <View key={item.id} style={[styles.recommendationCard, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
            <Image source={{ uri: item.cover }} style={styles.recommendationImage} />
            <View style={styles.recommendationInfo}>
              <Text style={styles.recommendationTitle}>{item.title}</Text>
              <Text style={styles.recommendationDescription}>{item.description}</Text>
              <TouchableOpacity 
                style={[styles.playButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
              >
                <Text style={styles.playButtonText}>Play</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        
        <View style={styles.uploadContainer}>
          <Text style={styles.uploadTitle}>Add Your Own Music</Text>
          <Text style={styles.uploadDescription}>
            Upload your tracks to enhance your Glaze experience
          </Text>
          <TouchableOpacity 
            style={[styles.uploadButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          >
            <Text style={styles.uploadButtonText}>Upload Music</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 60,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  moodContainer: {
    marginBottom: 20,
  },
  moodsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  moodButton: {
    alignItems: 'center',
    padding: 12,
    marginRight: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    width: 100,
  },
  selectedMoodButton: {
    borderWidth: 2,
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  recommendationCard: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  recommendationImage: {
    width: 120,
    height: 120,
  },
  recommendationInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recommendationDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
  },
  playButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  uploadContainer: {
    marginTop: 20,
    marginBottom: 40,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ddd',
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  uploadDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7,
  },
  uploadButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
}); 