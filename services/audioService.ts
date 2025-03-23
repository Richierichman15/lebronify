import { storage, firestore } from '@/config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import * as FileSystem from 'expo-file-system';

export interface AudioFile {
  id: string;
  title: string;
  artist: string;
  cover: string;
  tags: string[];
  uri: string;
  duration: string;
  uploadDate: string;
}

/**
 * Upload an audio file to Firebase Storage
 * @param fileUri Local file URI
 * @param title Audio title
 * @param artist Artist name
 * @param tags Array of tags
 * @returns Promise with download URL
 */
export const uploadAudio = async (
  fileUri: string, 
  title: string, 
  artist: string, 
  tags: string[]
): Promise<string> => {
  try {
    // Get file info
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      throw new Error('File does not exist');
    }
    
    // Create a file name for storage
    const fileName = `${Date.now()}_${title.replace(/\s+/g, '_').toLowerCase()}.mp3`;
    const storageRef = ref(storage, `audios/${fileName}`);
    
    // Read the file as base64
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    // Convert base64 to blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      const bytes = atob(base64);
      const buffer = new ArrayBuffer(bytes.length);
      const byteArray = new Uint8Array(buffer);
      
      for (let i = 0; i < bytes.length; i++) {
        byteArray[i] = bytes.charCodeAt(i);
      }
      
      resolve(new Blob([buffer], { type: 'audio/mpeg' }));
    });
    
    // Upload file
    const uploadTask = uploadBytesResumable(storageRef, blob);
    
    // Wait for upload to complete
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle error
          reject(error);
        },
        async () => {
          // Upload completed, get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Store metadata in Firestore
          await addDoc(collection(firestore, 'audios'), {
            title,
            artist,
            tags,
            uri: downloadURL,
            uploadDate: new Date().toISOString(),
            fileName,
          });
          
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
};

/**
 * Get all uploaded audio files
 * @returns Promise with array of audio files
 */
export const getAudios = async (): Promise<AudioFile[]> => {
  try {
    const q = query(
      collection(firestore, 'audios'),
      orderBy('uploadDate', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const audios: AudioFile[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      audios.push({
        id: doc.id,
        title: data.title,
        artist: data.artist,
        cover: data.cover || 'https://via.placeholder.com/60',
        tags: data.tags || [],
        uri: data.uri,
        duration: data.duration || '0:00',
        uploadDate: data.uploadDate,
      });
    });
    
    return audios;
  } catch (error) {
    console.error('Error getting audios:', error);
    throw error;
  }
};

/**
 * Get audio files by tag
 * @param tag Tag to filter by
 * @returns Promise with array of audio files
 */
export const getAudiosByTag = async (tag: string): Promise<AudioFile[]> => {
  try {
    const q = query(
      collection(firestore, 'audios'),
      where('tags', 'array-contains', tag),
      orderBy('uploadDate', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const audios: AudioFile[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      audios.push({
        id: doc.id,
        title: data.title,
        artist: data.artist,
        cover: data.cover || 'https://via.placeholder.com/60',
        tags: data.tags || [],
        uri: data.uri,
        duration: data.duration || '0:00',
        uploadDate: data.uploadDate,
      });
    });
    
    return audios;
  } catch (error) {
    console.error('Error getting audios by tag:', error);
    throw error;
  }
}; 