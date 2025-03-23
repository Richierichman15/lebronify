import React from 'react';
import { StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

interface UploadOptionsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function UploadOptionsModal({ visible, onClose }: UploadOptionsModalProps) {
  const colorScheme = useColorScheme();
  
  const options = [
    { 
      id: 'audio', 
      label: 'Upload Audio', 
      description: 'Share your music, podcasts, or audio clips',
      icon: '🎵',
      onPress: () => {
        onClose();
        router.push('/(tabs)/upload');
      }
    },
    { 
      id: 'glaze', 
      label: 'Add to Glaze', 
      description: 'Share LeBron highlights and inspiration',
      icon: '✨',
      onPress: () => {
        onClose();
        router.push('/(tabs)/glaze-upload');
      }
    },
    { 
      id: 'blog', 
      label: 'Create Blog Post', 
      description: 'Share your thoughts and stories',
      icon: '📝',
      onPress: () => {
        onClose();
        router.push('/(tabs)/blog-upload');
      }
    },
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContainer, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
              <Text style={styles.modalTitle}>Create Something New</Text>
              
              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionItem}
                  onPress={option.onPress}
                >
                  <View style={[styles.iconContainer, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }]}>
                    <Text style={styles.icon}>{option.icon}</Text>
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionLabel}>{option.label}</Text>
                    <Text style={styles.optionDescription}>{option.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity
                style={[styles.cancelButton, { borderColor: Colors[colorScheme ?? 'light'].tint }]}
                onPress={onClose}
              >
                <Text style={[styles.cancelText, { color: Colors[colorScheme ?? 'light'].tint }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    fontSize: 24,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  cancelButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 1,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 