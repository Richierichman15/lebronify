import { StyleSheet, TouchableOpacity, Image, TextInput, Alert, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function GlazeUploadScreen() {
  const colorScheme = useColorScheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Categories for LeBron content
  const categories = [
    'Highlights', 'Quotes', 'Stats', 'Game Moments', 
    'Career Milestones', 'Off-Court', 'Training', 'Legacy'
  ];
  
  // Pick image from device
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error('Error picking image:', err);
      Alert.alert('Error', 'Failed to pick image');
    }
  };
  
  // Upload content
  const uploadContent = async () => {
    if (!selectedImage) {
      Alert.alert('No Image Selected', 'Please select an image for your post');
      return;
    }
    
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a title for your post');
      return;
    }
    
    if (!selectedCategory) {
      Alert.alert('Missing Category', 'Please select a category for your post');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Upload Successful', 
        'Your content has been added to Glaze!',
        [{ 
          text: 'OK', 
          onPress: () => {
            router.push('/(tabs)/glaze');
          }
        }]
      );
    } catch (error) {
      Alert.alert('Upload Failed', 'There was an error uploading your content.');
      console.error('Error uploading content:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Add to Glaze</Text>
          <Text style={styles.headerSubtitle}>Share LeBron highlights and moments</Text>
        </View>
        
        {/* Image Selection */}
        <TouchableOpacity 
          style={[styles.imageUploadArea, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
          onPress={pickImage}
          disabled={isUploading}
        >
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          ) : (
            <>
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadText}>Tap to select an image</Text>
              <Text style={styles.uploadSubtext}>Share your favorite LeBron moment</Text>
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
              placeholder="Give your post a title"
              placeholderTextColor="#999"
              editable={!isUploading}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
              value={description}
              onChangeText={setDescription}
              placeholder="Tell the story behind this moment..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              editable={!isUploading}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoriesContainer}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && [
                      styles.selectedCategoryButton,
                      { backgroundColor: Colors[colorScheme ?? 'light'].tint }
                    ]
                  ]}
                  onPress={() => setSelectedCategory(category)}
                  disabled={isUploading}
                >
                  <Text 
                    style={[
                      styles.categoryText, 
                      selectedCategory === category && styles.selectedCategoryText
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <TouchableOpacity
            style={[
              styles.uploadButton,
              { backgroundColor: Colors[colorScheme ?? 'light'].tint },
              (!selectedImage || !title || !selectedCategory || isUploading) && styles.disabledButton
            ]}
            onPress={uploadContent}
            disabled={!selectedImage || !title || !selectedCategory || isUploading}
          >
            <Text style={styles.uploadButtonText}>
              {isUploading ? 'Uploading...' : 'Share to Glaze'}
            </Text>
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
  imageUploadArea: {
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    padding: 20,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    overflow: 'hidden',
  },
  uploadIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
  },
  uploadSubtext: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 8,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
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
  textArea: {
    minHeight: 100,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedCategoryButton: {
    borderWidth: 0,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
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