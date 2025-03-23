import { StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Link } from 'expo-router';
import React from 'react';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  
  // Featured content
  const featuredContent = {
    title: "LeBron's Greatest Moments",
    description: "A collection of iconic plays from the King's career",
    image: "https://via.placeholder.com/600x300"
  };
  
  // Recent audio content
  const recentAudios = [
    {
      id: '1',
      title: 'Game 7 Commentary',
      duration: '5:23',
      category: 'Commentary',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: '2',
      title: 'LeBron Post-Game Interview',
      duration: '8:45',
      category: 'Interview',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: '3',
      title: 'Career Highlight Reel',
      duration: '12:18',
      category: 'Highlights',
      image: 'https://via.placeholder.com/100',
    },
  ];
  
  // Glaze content highlights
  const glazeHighlights = [
    {
      id: '1',
      title: '4x NBA Champion',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      title: 'All-Time Scoring Leader',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      title: '4x NBA MVP',
      image: 'https://via.placeholder.com/150',
    },
  ];
  
  // Blog post highlights
  const blogHighlights = [
    {
      id: '1',
      title: "The Evolution of LeBron's Game",
      author: 'Basketball_Historian',
      date: 'May 5, 2023',
      excerpt: "How LeBron has adapted his play style over his career...",
      image: 'https://via.placeholder.com/200x120',
    },
    {
      id: '2',
      title: 'Impact Beyond Basketball',
      author: 'SportsSociologist',
      date: 'June 12, 2023',
      excerpt: "LeBron's influence on social justice and education...",
      image: 'https://via.placeholder.com/200x120',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.headerTitle}>Lebronify</Text>
        </View>
        
        {/* Featured Content */}
        <View style={styles.featuredContainer}>
          <Image 
            source={{ uri: featuredContent.image }} 
            style={styles.featuredImage} 
          />
          <View style={[styles.featuredOverlay, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '90' }]}>
            <Text style={styles.featuredTitle}>{featuredContent.title}</Text>
            <Text style={styles.featuredDescription}>{featuredContent.description}</Text>
            <TouchableOpacity style={styles.watchButton}>
              <Text style={styles.watchButtonText}>Watch Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Recent Audios Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Audio</Text>
            <Link href="/library" asChild>
              <TouchableOpacity>
                <Text style={[styles.viewAllText, { color: Colors[colorScheme ?? 'light'].tint }]}>See All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {recentAudios.map(audio => (
              <TouchableOpacity 
                key={audio.id} 
                style={[styles.audioCard, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
              >
                <Image source={{ uri: audio.image }} style={styles.audioImage} />
                <View style={styles.audioInfo}>
                  <Text style={styles.audioTitle} numberOfLines={1}>{audio.title}</Text>
                  <Text style={styles.audioSubtitle}>{audio.category} • {audio.duration}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Glaze Highlights Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Glaze Highlights</Text>
            <Link href="/glaze" asChild>
              <TouchableOpacity>
                <Text style={[styles.viewAllText, { color: Colors[colorScheme ?? 'light'].tint }]}>See All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          <View style={styles.glazeGrid}>
            {glazeHighlights.map(item => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.glazeCard, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
              >
                <Image source={{ uri: item.image }} style={styles.glazeImage} />
                <Text style={styles.glazeTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Blog Highlights Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>From the Blog</Text>
            <Link href="/blog" asChild>
              <TouchableOpacity>
                <Text style={[styles.viewAllText, { color: Colors[colorScheme ?? 'light'].tint }]}>See All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          {blogHighlights.map(blog => (
            <TouchableOpacity 
              key={blog.id} 
              style={[styles.blogCard, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
            >
              <Image source={{ uri: blog.image }} style={styles.blogImage} />
              <View style={styles.blogContent}>
                <Text style={styles.blogTitle}>{blog.title}</Text>
                <Text style={styles.blogAuthor}>By {blog.author} • {blog.date}</Text>
                <Text style={styles.blogExcerpt} numberOfLines={2}>{blog.excerpt}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Call to Action */}
        <View style={[styles.ctaContainer, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
          <Text style={styles.ctaTitle}>Share Your LeBron Content</Text>
          <Text style={styles.ctaDescription}>Upload audio, highlights, or write a blog post</Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');

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
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    opacity: 0.8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  featuredContainer: {
    position: 'relative',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  featuredDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginBottom: 12,
  },
  watchButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  watchButtonText: {
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  horizontalScroll: {
    marginBottom: 16,
  },
  audioCard: {
    width: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  audioImage: {
    width: '100%',
    height: 160,
  },
  audioInfo: {
    padding: 12,
  },
  audioTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  audioSubtitle: {
    fontSize: 12,
    opacity: 0.7,
  },
  glazeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  glazeCard: {
    width: (width - 44) / 3,
    borderRadius: 12,
    overflow: 'hidden',
  },
  glazeImage: {
    width: '100%',
    height: 100,
  },
  glazeTitle: {
    fontSize: 12,
    fontWeight: '600',
    padding: 8,
    textAlign: 'center',
  },
  blogCard: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  blogImage: {
    width: 100,
    height: 100,
  },
  blogContent: {
    flex: 1,
    padding: 12,
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  blogAuthor: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 6,
  },
  blogExcerpt: {
    fontSize: 14,
    opacity: 0.8,
  },
  ctaContainer: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  ctaDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginBottom: 16,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
  },
  ctaButtonText: {
    fontWeight: '600',
  },
});
