import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWdZJ6aXcH4Z5VCdZ1LQxV4rKE8XdxT1s",
  authDomain: "careerpulse-app.firebaseapp.com",
  projectId: "careerpulse-app",
  storageBucket: "careerpulse-app.appspot.com",
  messagingSenderId: "563154316723",
  appId: "1:563154316723:web:5f09c7e2dbf5f35e1723e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Register a new user
export const registerUser = async (userData) => {
  try {
    const { email, password, firstName, lastName } = userData;
    
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update the user's profile with additional information
    await updateProfile(userCredential.user, {
      displayName: `${firstName} ${lastName}`
    });
    
    // Get the user token
    const token = await userCredential.user.getIdToken();
    
    // Store the token in localStorage
    localStorage.setItem('token', token);
    
    // Return user data and token
    return {
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: `${firstName} ${lastName}`,
        photoURL: userCredential.user.photoURL
      },
      token
    };
  } catch (error) {
    throw error;
  }
};

// Login user with email and password
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    
    localStorage.setItem('token', token);
    
    return {
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL
      },
      token
    };
  } catch (error) {
    throw error;
  }
};

// Login with Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();
    
    localStorage.setItem('token', token);
    
    return {
      user: {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL
      },
      token
    };
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  await signOut(auth);
  localStorage.removeItem('token');
};