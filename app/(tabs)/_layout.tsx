import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, TouchableOpacity, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import UploadOptionsModal from '@/components/UploadOptionsModal';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 90,
              paddingBottom: 20,
            },
            default: {
              height: 70,
              paddingBottom: 10,
            },
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="glaze"
          options={{
            title: 'Glaze',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="sparkles" color={color} />,
          }}
        />
        <Tabs.Screen
          name="upload"
          options={{
            title: '',
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                style={[styles.uploadButtonContainer]}
                onPress={() => setModalVisible(true)}
              >
                <View style={[styles.uploadButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
                  <IconSymbol size={24} name="plus" color="#ffffff" />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="music.note.list" color={color} />,
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
          }}
        />
      </Tabs>
      
      <UploadOptionsModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </>
  );
}

const styles = StyleSheet.create({
  uploadButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
