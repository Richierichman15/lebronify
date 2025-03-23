import { StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';

export default function GlazeScreen() {
  const colorScheme = useColorScheme();
  
  // Mock data for LeBron's career highlights
  const careerHighlights = [
    { 
      id: '1', 
      title: '4x NBA Champion', 
      description: 'Won championships with Heat (2012, 2013) and Cavaliers (2016), Lakers (2020)', 
      image: 'https://via.placeholder.com/400x200',
    },
    { 
      id: '2', 
      title: 'All-Time Scoring Leader', 
      description: "Surpassed Kareem Abdul-Jabbar as NBA's all-time leading scorer on February 7, 2023",
      image: 'https://via.placeholder.com/400x200',
    },
    { 
      id: '3', 
      title: '4x NBA MVP', 
      description: 'Won the regular season MVP in 2009, 2010, 2012, and 2013', 
      image: 'https://via.placeholder.com/400x200',
    },
    { 
      id: '4', 
      title: '19x NBA All-Star', 
      description: 'Selected to the All-Star team 19 consecutive times since 2005', 
      image: 'https://via.placeholder.com/400x200',
    },
  ];
  
  // LeBron's career stats
  const careerStats = [
    { stat: 'Points', value: '39,868', description: 'All-time NBA scoring leader' },
    { stat: 'Assists', value: '10,900+', description: '4th all-time in NBA history' },
    { stat: 'Rebounds', value: '11,140+', description: 'Among the top 30 all-time' },
    { stat: 'Steals', value: '2,240+', description: 'Top 10 all-time in NBA history' },
    { stat: 'Games', value: '1,450+', description: 'One of the most durable players ever' },
  ];

  // LeBron quotes for motivation
  const quotes = [
    "Don't be afraid of failure. This is the way to succeed.",
    "You can't be afraid to fail. It's the only way you succeed. You're not gonna succeed all the time and I know that.",
    "I'm going to use all my tools, my God-given ability, and make the best life I can with it.",
    "I think the reason why I'm the person who I am today is because I went through those tough times when I was younger.",
    "I like criticism. It makes you strong.",
  ];
  
  // Recent content from community
  const communityContent = [
    { 
      id: '1',
      user: 'LakersGirl24',
      title: 'The King Takes Flight',
      image: 'https://via.placeholder.com/150',
      likes: 342,
      comments: 57,
      timestamp: '2 hours ago',
    },
    { 
      id: '2',
      user: 'HoopsDreamer',
      title: "LeBron's Leadership in Action",
      image: 'https://via.placeholder.com/150',
      likes: 289,
      comments: 41,
      timestamp: '4 hours ago',
    },
    { 
      id: '3',
      user: 'Basketball_Historian',
      title: 'Game 7 - 2016 Finals Revisited',
      image: 'https://via.placeholder.com/150',
      likes: 512,
      comments: 98,
      timestamp: '1 day ago',
    },
  ];
  
  // Get a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Glaze</Text>
          <Text style={styles.headerSubtitle}>Everything LeBron James</Text>
        </View>
        
        {/* Featured Highlight */}
        <View style={[styles.featuredContainer, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/400x250' }} 
            style={styles.featuredImage} 
          />
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle}>The King's Journey</Text>
            <Text style={styles.featuredDescription}>
              From Akron to global icon - explore LeBron's incredible career
            </Text>
            <TouchableOpacity 
              style={[styles.featuredButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            >
              <Text style={styles.featuredButtonText}>Watch Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Career Highlights Section */}
        <Text style={styles.sectionTitle}>Career Highlights</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlightsContainer}>
          {careerHighlights.map(highlight => (
            <TouchableOpacity key={highlight.id} style={styles.highlightCard}>
              <Image source={{ uri: highlight.image }} style={styles.highlightImage} />
              <View style={[styles.highlightContent, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
                <Text style={styles.highlightTitle}>{highlight.title}</Text>
                <Text style={styles.highlightDescription} numberOfLines={2}>{highlight.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Quote of the Day */}
        <View style={[styles.quoteContainer, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }]}>
          <Text style={styles.quoteText}>"{randomQuote}"</Text>
          <Text style={[styles.quoteAttribution, { color: Colors[colorScheme ?? 'light'].tint }]}>- LeBron James</Text>
        </View>
        
        {/* Career Stats */}
        <Text style={styles.sectionTitle}>Career Stats</Text>
        <View style={[styles.statsContainer, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
          {careerStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={[styles.statValue, { color: Colors[colorScheme ?? 'light'].tint }]}>{stat.value}</Text>
              <Text style={styles.statName}>{stat.stat}</Text>
              <Text style={styles.statDescription}>{stat.description}</Text>
            </View>
          ))}
        </View>
        
        {/* Community Content */}
        <View style={styles.communitySection}>
          <View style={styles.communityHeader}>
            <Text style={styles.sectionTitle}>Community Highlights</Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllButton, { color: Colors[colorScheme ?? 'light'].tint }]}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {communityContent.map(content => (
            <TouchableOpacity key={content.id} style={[styles.communityPost, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
              <Image source={{ uri: content.image }} style={styles.communityImage} />
              <View style={styles.communityContent}>
                <Text style={styles.communityTitle}>{content.title}</Text>
                <Text style={styles.communityUser}>Posted by {content.user}</Text>
                <View style={styles.communityMeta}>
                  <Text style={styles.communityMetaText}>{content.likes} likes</Text>
                  <Text style={styles.communityMetaText}>{content.comments} comments</Text>
                  <Text style={styles.communityMetaText}>{content.timestamp}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Share Your Moments CTA */}
        <TouchableOpacity 
          style={[styles.ctaContainer, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
        >
          <Text style={styles.ctaText}>Share Your LeBron Moment</Text>
          <Text style={styles.ctaSubtext}>Add your highlights to the Glaze community</Text>
        </TouchableOpacity>
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
  featuredContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  featuredImage: {
    width: '100%',
    height: 200,
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 12,
  },
  featuredButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  highlightsContainer: {
    marginBottom: 24,
  },
  highlightCard: {
    width: 280,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
  },
  highlightImage: {
    width: '100%',
    height: 160,
  },
  highlightContent: {
    padding: 12,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  highlightDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  quoteContainer: {
    padding: 20,
    borderRadius: 12,
    marginVertical: 24,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 26,
    marginBottom: 12,
  },
  quoteAttribution: {
    fontSize: 14,
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  statsContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    marginBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    paddingBottom: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  communitySection: {
    marginBottom: 24,
  },
  communityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    fontSize: 14,
    fontWeight: '600',
  },
  communityPost: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  communityImage: {
    width: 100,
    height: 100,
  },
  communityContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  communityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  communityUser: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  communityMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  communityMetaText: {
    fontSize: 12,
    opacity: 0.6,
    marginRight: 10,
  },
  ctaContainer: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  ctaSubtext: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
}); 