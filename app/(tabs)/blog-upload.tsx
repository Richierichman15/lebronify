import { StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { router } from 'expo-router';

export default function BlogUploadScreen() {
  const colorScheme = useColorScheme();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  // Available topics for blog posts
  const topics = [
    'Basketball Analysis', 'LeBron Legacy', 'NBA News', 'Player Comparisons',
    'Lakers', 'Off-Court Impact', 'Career Stats', 'Fan Stories'
  ];
  
  // Toggle topic selection
  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };
  
  // Upload blog post
  const uploadBlogPost = async () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a title for your blog post');
      return;
    }
    
    if (!content.trim() || content.length < 50) {
      Alert.alert('Content Too Short', 'Please write more content for your blog post (at least 50 characters)');
      return;
    }
    
    if (selectedTopics.length === 0) {
      Alert.alert('Missing Topics', 'Please select at least one topic for your blog post');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Blog Post Published', 
        'Your blog post has been published successfully!',
        [{ 
          text: 'OK', 
          onPress: () => {
            router.push('/(tabs)/index');
          }
        }]
      );
    } catch (error) {
      Alert.alert('Upload Failed', 'There was an error publishing your blog post.');
      console.error('Error publishing blog post:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create Blog Post</Text>
          <Text style={styles.headerSubtitle}>Share your thoughts with the community</Text>
        </View>
        
        {/* Blog Form */}
        <View style={styles.formContainer}>
          <View style={styles.formField}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={[styles.input, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
              value={title}
              onChangeText={setTitle}
              placeholder="Give your blog post a catchy title"
              placeholderTextColor="#999"
              editable={!isUploading}
              maxLength={100}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.label}>Content</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
              value={content}
              onChangeText={setContent}
              placeholder="Write your blog post here..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={10}
              editable={!isUploading}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.label}>Topics</Text>
            <View style={styles.topicsContainer}>
              {topics.map(topic => (
                <TouchableOpacity
                  key={topic}
                  style={[
                    styles.topicButton,
                    selectedTopics.includes(topic) && [
                      styles.selectedTopicButton,
                      { backgroundColor: Colors[colorScheme ?? 'light'].tint }
                    ]
                  ]}
                  onPress={() => toggleTopic(topic)}
                  disabled={isUploading}
                >
                  <Text 
                    style={[
                      styles.topicText, 
                      selectedTopics.includes(topic) && styles.selectedTopicText
                    ]}
                  >
                    {topic}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.formOptions}>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Tips for a great blog post:</Text>
              <Text style={styles.infoText}>• Be specific and provide examples</Text>
              <Text style={styles.infoText}>• Use stats to support your points</Text>
              <Text style={styles.infoText}>• Keep paragraphs short and concise</Text>
              <Text style={styles.infoText}>• Proofread before publishing</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={[
              styles.publishButton,
              { backgroundColor: Colors[colorScheme ?? 'light'].tint },
              (title.length < 5 || content.length < 50 || selectedTopics.length === 0 || isUploading) && styles.disabledButton
            ]}
            onPress={uploadBlogPost}
            disabled={title.length < 5 || content.length < 50 || selectedTopics.length === 0 || isUploading}
          >
            <Text style={styles.publishButtonText}>
              {isUploading ? 'Publishing...' : 'Publish Blog Post'}
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
    minHeight: 200,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topicButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTopicButton: {
    borderWidth: 0,
  },
  topicText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedTopicText: {
    color: 'white',
  },
  formOptions: {
    marginVertical: 20,
  },
  infoBox: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 6,
    opacity: 0.8,
  },
  publishButton: {
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  publishButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
}); 