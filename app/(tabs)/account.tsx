import { StyleSheet, Image, Switch, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';

export default function AccountScreen() {
  const colorScheme = useColorScheme();
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePic: 'https://via.placeholder.com/100',
    plan: 'Premium',
  };
  
  // Toggle states for settings
  const [notifications, setNotifications] = useState(true);
  const [downloadOverCellular, setDownloadOverCellular] = useState(false);
  const [streamingQuality, setStreamingQuality] = useState('High');
  const [dataSaver, setDataSaver] = useState(false);
  
  // Setting sections
  const settingSections = [
    {
      title: 'Account',
      settings: [
        { id: 'profile', label: 'Edit Profile', type: 'link' },
        { id: 'subscription', label: 'Subscription Plan', type: 'info', value: user.plan },
        { id: 'payment', label: 'Payment Methods', type: 'link' },
      ]
    },
    {
      title: 'Playback',
      settings: [
        { 
          id: 'quality', 
          label: 'Streaming Quality', 
          type: 'info',
          value: streamingQuality,
          onPress: () => {} // Would show options in a real app
        },
        { 
          id: 'dataSaver', 
          label: 'Data Saver', 
          type: 'toggle',
          value: dataSaver,
          onToggle: () => setDataSaver(!dataSaver)
        },
        { 
          id: 'downloadQuality', 
          label: 'Download Quality', 
          type: 'info',
          value: 'High'
        },
      ]
    },
    {
      title: 'Notifications',
      settings: [
        { 
          id: 'pushNotifications', 
          label: 'Push Notifications', 
          type: 'toggle',
          value: notifications,
          onToggle: () => setNotifications(!notifications)
        },
        { 
          id: 'emailNotifications', 
          label: 'Email Notifications', 
          type: 'toggle',
          value: true
        },
      ]
    },
    {
      title: 'About',
      settings: [
        { id: 'termsOfService', label: 'Terms of Service', type: 'link' },
        { id: 'privacyPolicy', label: 'Privacy Policy', type: 'link' },
        { id: 'licenses', label: 'Licenses', type: 'link' },
        { id: 'version', label: 'App Version', type: 'info', value: '1.0.0' },
      ]
    }
  ];

  // Render a setting item based on its type
  const renderSetting = (setting: {
    id: string;
    label: string;
    type: string;
    value?: string | boolean;
    onToggle?: () => void;
    onPress?: () => void;
  }) => {
    return (
      <View key={setting.id} style={styles.settingItem}>
        <Text style={styles.settingLabel}>{setting.label}</Text>
        
        {setting.type === 'toggle' && (
          <Switch
            value={setting.value as boolean}
            onValueChange={setting.onToggle}
            trackColor={{ false: '#767577', true: Colors[colorScheme ?? 'light'].tint }}
            thumbColor={'#f4f3f4'}
          />
        )}
        
        {setting.type === 'info' && (
          <Text style={styles.settingValue}>{setting.value as string}</Text>
        )}
        
        {setting.type === 'link' && (
          <Text style={[styles.settingLink, { color: Colors[colorScheme ?? 'light'].tint }]}>
            &gt;
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>
      
      {/* User profile section */}
      <View style={[styles.profileContainer, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
        <Image source={{ uri: user.profilePic }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
      </View>
      
      {/* Settings sections */}
      {settingSections.map(section => (
        <View key={section.title} style={styles.settingSection}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={[styles.settingsList, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
            {section.settings.map(setting => renderSetting(setting))}
          </View>
        </View>
      ))}
      
      {/* Log out button */}
      <TouchableOpacity 
        style={[styles.logoutButton, { borderColor: Colors[colorScheme ?? 'light'].tint }]}
      >
        <Text style={[styles.logoutText, { color: Colors[colorScheme ?? 'light'].tint }]}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    opacity: 0.7,
  },
  settingSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 4,
  },
  settingsList: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingLabel: {
    fontSize: 16,
  },
  settingValue: {
    fontSize: 14,
    opacity: 0.7,
  },
  settingLink: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 