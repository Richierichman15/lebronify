import { StyleSheet, ScrollView, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import React from 'react';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  
  // Mock data for recently played
  const recentlyPlayed = [
    { id: '1', title: 'Daily Mix 1', artist: 'For You', cover: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Hip Hop Mix', artist: 'Drake, Kendrick Lamar, J. Cole', cover: 'https://via.placeholder.com/150' },
    { id: '3', title: 'Top Hits', artist: 'Global', cover: 'https://via.placeholder.com/150' },
    { id: '4', title: 'Chill Vibes', artist: 'Lo-fi, Jazz, Ambient', cover: 'https://via.placeholder.com/150' },
  ];
  
  // Mock data for playlists
  const playlists = [
    { id: '1', title: 'Your Favorites', cover: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Running Mix', cover: 'https://via.placeholder.com/150' },
    { id: '3', title: 'Study Session', cover: 'https://via.placeholder.com/150' },
    { id: '4', title: 'Party Playlist', cover: 'https://via.placeholder.com/150' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Good Evening</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Recently Played</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {recentlyPlayed.map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
              <Image source={{ uri: item.cover }} style={styles.albumCover} />
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.subtitle} numberOfLines={1}>{item.artist}</Text>
            </View>
          ))}
        </ScrollView>
        
        <Text style={styles.sectionTitle}>Your Playlists</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {playlists.map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
              <Image source={{ uri: item.cover }} style={styles.albumCover} />
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
        
        <Text style={styles.sectionTitle}>Made For You</Text>
        <View style={styles.featuredContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/300' }} 
            style={styles.featuredImage} 
          />
          <Text style={styles.featuredTitle}>Weekly Discovery</Text>
          <Text style={styles.featuredSubtitle}>New music based on your listening</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  horizontalList: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  card: {
    width: 150,
    marginRight: 16,
    borderRadius: 8,
    padding: 10,
    paddingBottom: 16,
  },
  albumCover: {
    width: 130,
    height: 130,
    borderRadius: 4,
    marginBottom: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.8,
  },
  featuredContainer: {
    marginTop: 8,
    marginBottom: 30,
    alignItems: 'center',
  },
  featuredImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
  featuredSubtitle: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
});
