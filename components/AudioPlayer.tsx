import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View as RNView, Animated, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

interface AudioPlayerProps {
  uri: string;
  title: string;
  artist?: string;
  imageUri?: string;
}

export default function AudioPlayer({ uri, title, artist, imageUri }: AudioPlayerProps) {
  const colorScheme = useColorScheme();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // Load the audio file
  useEffect(() => {
    let isMounted = true;
    
    const loadAudio = async () => {
      try {
        // Unload any existing sound
        if (sound) {
          await sound.unloadAsync();
        }
        
        setIsLoading(true);
        
        // Load the audio file
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: false },
          onPlaybackStatusUpdate
        );
        
        if (isMounted) {
          setSound(newSound);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading audio:', error);
        setIsLoading(false);
      }
    };
    
    loadAudio();
    
    // Clean up
    return () => {
      isMounted = false;
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [uri]);
  
  // Update playback status
  const onPlaybackStatusUpdate = (status: Audio.PlaybackStatus) => {
    if (!status.isLoaded) return;
    
    if (status.didJustFinish) {
      setIsPlaying(false);
      setPosition(0);
      setSliderValue(0);
      return;
    }
    
    if (!isSeeking) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
      setSliderValue(status.positionMillis || 0);
    }
  };
  
  // Play/pause toggle
  const togglePlayback = async () => {
    if (!sound) return;
    
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Seek to a specific position
  const seekAudio = async (value: number) => {
    if (!sound) return;
    
    setIsSeeking(false);
    await sound.setPositionAsync(value);
  };
  
  // Format time (milliseconds to mm:ss)
  const formatTime = (milliseconds: number) => {
    if (!milliseconds) return '00:00';
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
      {/* Title and Artist */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {artist && <Text style={styles.artist} numberOfLines={1}>{artist}</Text>}
      </View>
      
      {/* Playback Controls */}
      <View style={styles.controlsContainer}>
        {/* Play/Pause Button */}
        <TouchableOpacity 
          style={[styles.playButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={togglePlayback}
          disabled={isLoading}
        >
          <Text style={styles.playButtonIcon}>
            {isLoading ? '⏳' : isPlaying ? '⏸️' : '▶️'}
          </Text>
        </TouchableOpacity>
        
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration || 1}
            value={sliderValue}
            minimumTrackTintColor={Colors[colorScheme ?? 'light'].tint}
            maximumTrackTintColor="#DDDDDD"
            thumbTintColor={Colors[colorScheme ?? 'light'].tint}
            onSlidingStart={() => setIsSeeking(true)}
            onSlidingComplete={(value) => seekAudio(value)}
            onValueChange={(value) => setSliderValue(value)}
            disabled={isLoading || duration === 0}
          />
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
  },
  infoContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  artist: {
    fontSize: 14,
    opacity: 0.7,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  playButtonIcon: {
    fontSize: 18,
    color: 'white',
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
  },
  timeText: {
    fontSize: 12,
    opacity: 0.8,
    width: 35,
  },
}); 