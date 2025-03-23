import { StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import AudioPlayer from '@/components/AudioPlayer';

export default function LibraryScreen() {
  const colorScheme = useColorScheme();
  
  const [activeTab, setActiveTab] = useState('playlists');
  const [selectedAudio, setSelectedAudio] = useState<{
    id: string;
    title: string;
    artist: string;
    uri: string;
  } | null>(null);
  
  // Mock data for user library
  const playlists = [
    { id: '1', title: 'Liked Songs', count: '347 songs', cover: 'https://via.placeholder.com/60?text=♥' },
    { id: '2', title: 'Workout Mix', count: '23 songs', cover: 'https://via.placeholder.com/60' },
    { id: '3', title: 'Chill Vibes', count: '45 songs', cover: 'https://via.placeholder.com/60' },
    { id: '4', title: 'Road Trip', count: '78 songs', cover: 'https://via.placeholder.com/60' },
    { id: '5', title: '2010s Hits', count: '124 songs', cover: 'https://via.placeholder.com/60' },
  ];
  
  const artists = [
    { id: '1', name: 'Drake', type: 'Artist', cover: 'https://via.placeholder.com/60' },
    { id: '2', name: 'Taylor Swift', type: 'Artist', cover: 'https://via.placeholder.com/60' },
    { id: '3', name: 'The Weeknd', type: 'Artist', cover: 'https://via.placeholder.com/60' },
    { id: '4', name: 'Kendrick Lamar', type: 'Artist', cover: 'https://via.placeholder.com/60' },
    { id: '5', name: 'Billie Eilish', type: 'Artist', cover: 'https://via.placeholder.com/60' },
  ];
  
  const albums = [
    { id: '1', title: 'After Hours', artist: 'The Weeknd', cover: 'https://via.placeholder.com/60' },
    { id: '2', title: 'DAMN.', artist: 'Kendrick Lamar', cover: 'https://via.placeholder.com/60' },
    { id: '3', title: 'Scorpion', artist: 'Drake', cover: 'https://via.placeholder.com/60' },
    { id: '4', title: 'When We All Fall Asleep, Where Do We Go?', artist: 'Billie Eilish', cover: 'https://via.placeholder.com/60' },
    { id: '5', title: 'folklore', artist: 'Taylor Swift', cover: 'https://via.placeholder.com/60' },
  ];
  
  // Mock data for uploaded audio files
  const uploadedAudios = [
    { 
      id: '1', 
      title: 'My Demo Track', 
      artist: 'You', 
      cover: 'https://via.placeholder.com/60',
      tags: ['Demo', 'Rock'],
      uri: 'https://example.com/audio.mp3',
      duration: '3:45',
      uploadDate: '2023-05-15',
    },
    { 
      id: '2', 
      title: 'Home Recording', 
      artist: 'You', 
      cover: 'https://via.placeholder.com/60',
      tags: ['Voice Memo'],
      uri: 'https://example.com/audio2.mp3',
      duration: '1:20',
      uploadDate: '2023-06-22',
    },
    { 
      id: '3', 
      title: 'Guitar Practice', 
      artist: 'You', 
      cover: 'https://via.placeholder.com/60',
      tags: ['Practice', 'Guitar'],
      uri: 'https://example.com/audio3.mp3',
      duration: '5:12',
      uploadDate: '2023-07-10',
    },
    { 
      id: '4', 
      title: 'Game Highlight Clip', 
      artist: 'You', 
      cover: 'https://via.placeholder.com/60',
      tags: ['Game Highlights'],
      uri: 'https://example.com/audio4.mp3',
      duration: '0:45',
      uploadDate: '2023-08-05',
    },
  ];

  // Determine which data to display based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'playlists':
        return renderList(playlists);
      case 'artists':
        return renderList(artists);
      case 'albums':
        return renderList(albums);
      case 'uploads':
        return renderUploads();
      default:
        return null;
    }
  };
  
  // Renders a list of items based on the provided data
  const renderList = (data: Array<{
    id: string;
    title?: string;
    name?: string;
    count?: string;
    artist?: string;
    type?: string;
    cover: string;
  }>) => (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.listItem}>
          <Image source={{ uri: item.cover }} style={styles.coverImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle} numberOfLines={1}>
              {item.title || item.name}
            </Text>
            <Text style={styles.itemSubtitle} numberOfLines={1}>
              {item.count || item.artist || item.type}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
  
  // Render uploaded audios with audio player
  const renderUploads = () => {
    if (uploadedAudios.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>You haven't uploaded any songs yet</Text>
          <TouchableOpacity 
            style={[styles.uploadButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          >
            <Text style={styles.uploadButtonText}>Upload Music</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    return (
      <FlatList
        data={uploadedAudios}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.audioItem, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
            onPress={() => setSelectedAudio({
              id: item.id,
              title: item.title,
              artist: item.artist,
              uri: item.uri
            })}
          >
            <Image source={{ uri: item.cover }} style={styles.audioCoverImage} />
            <View style={styles.audioInfo}>
              <Text style={styles.audioTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.audioArtist} numberOfLines={1}>{item.artist}</Text>
              
              <View style={styles.audioMetaRow}>
                <Text style={styles.audioMeta}>{item.duration}</Text>
                <View style={styles.tagContainer}>
                  {item.tags.map((tag, index) => (
                    <View 
                      key={index} 
                      style={[styles.tag, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '30' }]}
                    >
                      <Text style={[styles.tagText, { color: Colors[colorScheme ?? 'light'].tint }]}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Library</Text>
        <TouchableOpacity>
          <Text style={[styles.searchButton, { color: Colors[colorScheme ?? 'light'].tint }]}>Search</Text>
        </TouchableOpacity>
      </View>
      
      {/* Tab navigation */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.tabRow}
        contentContainerStyle={styles.tabContainer}
      >
        {['playlists', 'artists', 'albums', 'uploads'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && [
                styles.activeTabButton, 
                { backgroundColor: Colors[colorScheme ?? 'light'].tint }
              ]
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === tab && styles.activeTabText
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.listContainer}>
        {renderContent()}
      </View>
      
      {/* Audio Player */}
      {selectedAudio && (
        <View style={styles.playerContainer}>
          <AudioPlayer
            uri={selectedAudio.uri}
            title={selectedAudio.title}
            artist={selectedAudio.artist}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  searchButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  tabRow: {
    maxHeight: 50,
  },
  tabContainer: {
    paddingVertical: 10,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#e5e5e5',
  },
  activeTabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  itemInfo: {
    marginLeft: 15,
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemSubtitle: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.7,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyStateText: {
    fontSize: 16,
    marginBottom: 20,
    opacity: 0.7,
  },
  uploadButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  audioItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  audioCoverImage: {
    width: 70,
    height: 70,
    borderRadius: 6,
  },
  audioInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  audioTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  audioArtist: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  audioMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioMeta: {
    fontSize: 12,
    opacity: 0.6,
    marginRight: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '500',
  },
  separator: {
    height: 10,
  },
  playerContainer: {
    position: 'absolute', 
    bottom: 90, 
    left: 16, 
    right: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 