import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, writeBatch, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');

const COLLECTION_NAME = 'cms_data';

// Helper to load all CMS data from Firestore
export async function loadCMSFromFirestore(): Promise<any> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    if (querySnapshot.empty) {
      return null;
    }
    const cmsData: any = {};
    querySnapshot.forEach((doc) => {
      cmsData[doc.id] = doc.data().data;
    });
    return cmsData;
  } catch (error) {
    console.error('Error loading CMS data from Firestore:', error);
    throw error;
  }
}

// Helper to save all CMS data to Firestore using individual documents per section to bypass the 1MB limit
export async function saveCMSToFirestore(data: any): Promise<boolean> {
  try {
    const batch = writeBatch(db);
    for (const key of Object.keys(data)) {
      const docRef = doc(db, COLLECTION_NAME, key);
      batch.set(docRef, { data: data[key] });
    }
    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error saving CMS data to Firestore:', error);
    return false;
  }
}
