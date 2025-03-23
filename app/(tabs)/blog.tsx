import { StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import React from 'react';

export default function BlogScreen() {
  const colorScheme = useColorScheme();
  
  // Featured blog post
  const featuredBlog = {
    id: 'featured',
    title: "The LeBron Legacy: More Than Basketball",
    author: "Michael Jordan Thompson",
    date: "June 15, 2023",
    image: "https://via.placeholder.com/800x400",
    excerpt: "Examining how LeBron James has transcended the sport to become a global icon and advocate for social change...",
    readTime: "8 min read",
    tags: ["Legacy", "Social Impact", "Career"]
  };
  
  // Blog categories
  const categories = [
    "All Posts",
    "Career Analysis",
    "Game Breakdowns",
    "Legacy",
    "Social Impact",
    "Business Ventures"
  ];
  
  // Blog posts
  const blogPosts = [
    {
      id: '1',
      title: "Evolution of LeBron's Shooting Form",
      author: "Coach Analytics",
      date: "May 20, 2023",
      image: "https://via.placeholder.com/400x250",
      excerpt: "A detailed breakdown of how LeBron improved his shooting mechanics throughout his career...",
      readTime: "6 min read",
      tags: ["Analysis", "Technique"]
    },
    {
      id: '2',
      title: "The Decision: 10 Years Later",
      author: "Basketball Historian",
      date: "April 12, 2023",
      image: "https://via.placeholder.com/400x250",
      excerpt: "Revisiting one of the most controversial moments in sports television and its lasting impact...",
      readTime: "10 min read",
      tags: ["History", "Career"]
    },
    {
      id: '3',
      title: "LeBron vs. Jordan: The GOAT Debate",
      author: "Stats Master",
      date: "March 5, 2023",
      image: "https://via.placeholder.com/400x250",
      excerpt: "Breaking down the statistical case for both players in the greatest of all time conversation...",
      readTime: "12 min read",
      tags: ["Comparison", "Stats"]
    },
    {
      id: '4',
      title: "The I Promise School: Educational Revolution",
      author: "Education Insider",
      date: "February 18, 2023",
      image: "https://via.placeholder.com/400x250",
      excerpt: "How LeBron's educational initiative is changing lives and setting new standards...",
      readTime: "7 min read",
      tags: ["Social Impact", "Education"]
    },
    {
      id: '5',
      title: "LeBron's Business Empire",
      author: "Financial Analyst",
      date: "January 30, 2023",
      image: "https://via.placeholder.com/400x250",
      excerpt: "Examining the growing portfolio of investments and companies in the LeBron business ecosystem...",
      readTime: "9 min read",
      tags: ["Business", "Investments"]
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Blog</Text>
          <Text style={styles.headerSubtitle}>LeBron insights and stories</Text>
        </View>
        
        {/* Featured Post */}
        <TouchableOpacity style={styles.featuredContainer}>
          <Image 
            source={{ uri: featuredBlog.image }} 
            style={styles.featuredImage} 
          />
          <View style={[styles.featuredContent, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
            <Text style={styles.featuredTag}>FEATURED</Text>
            <Text style={styles.featuredTitle}>{featuredBlog.title}</Text>
            <Text style={styles.featuredExcerpt}>{featuredBlog.excerpt}</Text>
            <View style={styles.featuredMeta}>
              <Text style={styles.featuredAuthor}>By {featuredBlog.author}</Text>
              <Text style={styles.featuredDate}>{featuredBlog.date}</Text>
              <Text style={styles.featuredReadTime}>{featuredBlog.readTime}</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.categoryButton, 
                index === 0 && styles.activeCategoryButton,
                index === 0 && { backgroundColor: Colors[colorScheme ?? 'light'].tint }
              ]}
            >
              <Text 
                style={[
                  styles.categoryText, 
                  index === 0 && styles.activeCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Blog List */}
        <View style={styles.blogList}>
          {blogPosts.map(post => (
            <TouchableOpacity 
              key={post.id} 
              style={[styles.blogCard, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
            >
              <Image source={{ uri: post.image }} style={styles.blogImage} />
              <View style={styles.blogContent}>
                <Text style={styles.blogTitle}>{post.title}</Text>
                <Text style={styles.blogExcerpt} numberOfLines={2}>{post.excerpt}</Text>
                <View style={styles.blogMeta}>
                  <Text style={styles.blogMetaText}>By {post.author}</Text>
                  <Text style={styles.blogMetaText}>{post.readTime}</Text>
                </View>
                <View style={styles.tagContainer}>
                  {post.tags.map((tag, index) => (
                    <View 
                      key={index} 
                      style={[styles.tagBadge, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }]}
                    >
                      <Text style={[styles.tagText, { color: Colors[colorScheme ?? 'light'].tint }]}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Subscribe Section */}
        <View style={[styles.subscribeContainer, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '15' }]}>
          <Text style={styles.subscribeTitle}>Stay Updated</Text>
          <Text style={styles.subscribeText}>
            Get the latest LeBron news and analysis delivered to your inbox
          </Text>
          <TouchableOpacity 
            style={[styles.subscribeButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          >
            <Text style={styles.subscribeButtonText}>Subscribe to Newsletter</Text>
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
    marginBottom: 24,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featuredImage: {
    width: '100%',
    height: 200,
  },
  featuredContent: {
    padding: 20,
  },
  featuredTag: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featuredExcerpt: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.8,
    marginBottom: 16,
  },
  featuredMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featuredAuthor: {
    fontSize: 13,
    fontWeight: '600',
    marginRight: 16,
  },
  featuredDate: {
    fontSize: 13,
    opacity: 0.7,
    marginRight: 16,
  },
  featuredReadTime: {
    fontSize: 13,
    opacity: 0.7,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F0F0F0',
  },
  activeCategoryButton: {
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeCategoryText: {
    color: 'white',
  },
  blogList: {
    marginBottom: 24,
  },
  blogCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  blogImage: {
    width: '100%',
    height: 180,
  },
  blogContent: {
    padding: 16,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  blogExcerpt: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 12,
  },
  blogMeta: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  blogMetaText: {
    fontSize: 13,
    opacity: 0.7,
    marginRight: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  subscribeContainer: {
    padding: 24,
    borderRadius: 12,
    marginBottom: 40,
    alignItems: 'center',
  },
  subscribeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subscribeText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
    lineHeight: 20,
  },
  subscribeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  subscribeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
}); 