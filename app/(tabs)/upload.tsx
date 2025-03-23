import { StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function UploadScreen() {
  const colorScheme = useColorScheme();
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  // Available tags for audio categorization
  const availableTags = [
    'Hip Hop', 'Rock', 'Pop', 'Jazz', 'Classical', 'Electronic',
    'Funny', 'Motivational', 'Podcast', 'Ambient', 'Game Highlights', 
    'Voice Memo', 'Educational', 'Interview', 'Demo'
  ];
  
  // Pick audio file
  const pickAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/*'],
        copyToCacheDirectory: true,
      });
      
      if (result.canceled) {
        return;
      }
      
      // Get the first asset
      const asset = result.assets[0];
      
      // Check if it's an audio file
      const fileExtension = asset.name.split('.').pop()?.toLowerCase();
      const isAudio = ['mp3', 'wav', 'aac', 'm4a', 'flac', 'ogg'].includes(fileExtension || '');
      
      if (!isAudio) {
        Alert.alert('Invalid File', 'Please select an audio file (MP3, WAV, etc.)');
        return;
      }
      
      // Check file size (limit to 10MB for demo)
      if (asset.size && asset.size > 10 * 1024 * 1024) {
        Alert.alert('File Too Large', 'Please select a file smaller than 10MB');
        return;
      }
      
      setSelectedFile(asset);
    } catch (err) {
      Alert.alert('Error', 'Failed to pick audio file');
      console.error('Error picking audio file:', err);
    }
  };
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Upload audio file
  const uploadAudio = async () => {
    if (!selectedFile) {
      Alert.alert('No File Selected', 'Please select an audio file to upload');
      return;
    }
    
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a title for your audio');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // In a real app, this would upload to Firebase Storage or AWS S3
      // For demo purposes, we'll just simulate an upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success!
      Alert.alert(
        'Upload Successful', 
        'Your audio has been uploaded successfully!',
        [{ 
          text: 'OK', 
          onPress: () => {
            // Reset form
            setSelectedFile(null);
            setTitle('');
            setArtist('');
            setSelectedTags([]);
          }
        }]
      );
    } catch (error) {
      Alert.alert('Upload Failed', 'There was an error uploading your audio.');
      console.error('Error uploading audio:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Upload Audio</Text>
          <Text style={styles.headerSubtitle}>Share your music, podcasts, and audio clips</Text>
        </View>
        
        {/* File Selection */}
        <TouchableOpacity 
          style={[styles.uploadArea, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
          onPress={pickAudio}
          disabled={isUploading}
        >
          {selectedFile ? (
            <View style={styles.selectedFileContainer}>
              <View style={styles.fileIconContainer}>
                <IconSymbol name="music.note" size={40} color={Colors[colorScheme ?? 'light'].tint} />
              </View>
              <Text style={styles.fileName} numberOfLines={1}>{selectedFile.name}</Text>
              <Text style={styles.fileSize}>
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </Text>
            </View>
          ) : (
            <>
              <IconSymbol name="arrow.up.doc" size={50} color={Colors[colorScheme ?? 'light'].tint} />
              <Text style={styles.uploadText}>Tap to select an audio file</Text>
              <Text style={styles.uploadSubtext}>MP3, WAV, AAC, and more</Text>
            </>
          )}
        </TouchableOpacity>
        
        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.formField}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={[styles.input, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter audio title"
              placeholderTextColor="#999"
              editable={!isUploading}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.label}>Artist/Creator</Text>
            <TextInput
              style={[styles.input, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
              value={artist}
              onChangeText={setArtist}
              placeholder="Enter artist or creator name"
              placeholderTextColor="#999"
              editable={!isUploading}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.label}>Tags (select all that apply)</Text>
            <View style={styles.tagsContainer}>
              {availableTags.map(tag => (
                <TouchableOpacity
                  key={tag}
                  style={[
                    styles.tagButton,
                    selectedTags.includes(tag) && [
                      styles.selectedTagButton,
                      { backgroundColor: Colors[colorScheme ?? 'light'].tint }
                    ]
                  ]}
                  onPress={() => toggleTag(tag)}
                  disabled={isUploading}
                >
                  <Text 
                    style={[
                      styles.tagText, 
                      selectedTags.includes(tag) && styles.selectedTagText
                    ]}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <TouchableOpacity
            style={[
              styles.uploadButton,
              { backgroundColor: Colors[colorScheme ?? 'light'].tint },
              (!selectedFile || isUploading) && styles.disabledButton
            ]}
            onPress={uploadAudio}
            disabled={!selectedFile || isUploading}
          >
            <Text style={styles.uploadButtonText}>
              {isUploading ? 'Uploading...' : 'Upload Audio'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function IconSymbol({ name, size, color }: { name: string, size: number, color: string }) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: size/2, color }}>{name === 'arrow.up.doc' ? '📄' : '🎵'}</Text>
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
  uploadArea: {
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  uploadSubtext: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 8,
  },
  selectedFileContainer: {
    alignItems: 'center',
    width: '100%',
  },
  fileIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 14,
    opacity: 0.6,
  },
  formContainer: {
    marginTop: 24,
    marginBottom: 40,
  },
  formField: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tagButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTagButton: {
    borderWidth: 0,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedTagText: {
    color: 'white',
  },
  uploadButton: {
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
}); 