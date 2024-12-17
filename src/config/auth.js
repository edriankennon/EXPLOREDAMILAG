import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase"; // Import Firebase Auth instance

// Function to sign up a new user
export const handleSignUp = async (email, password) => {
  try {
    console.log("Attempting sign-up with email:", email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Sign-up successful:", userCredential.user);

    // Log for persistence confirmation
    console.log("Auth Persistence Test: User signed up", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("Sign-up error:", error.code, error.message);

    // Specific error handling
    if (error.code === "auth/network-request-failed") {
      alert("Network error. Please check your internet connection.");
    } else if (error.code === "auth/email-already-in-use") {
      alert("This email is already in use. Try logging in.");
    } else if (error.code === "auth/invalid-email") {
      alert("Invalid email address.");
    } else if (error.code === "auth/weak-password") {
      alert("Password should be at least 6 characters long.");
    } else {
      alert(error.message || "An unknown error occurred.");
    }
    throw error;
  }
};

// Function to log in an existing user
export const handleLogIn = async (email, password) => {
  try {
    console.log("Attempting login for email:", email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);

    // Log for persistence confirmation
    console.log("Auth Persistence Test: User logged in", userCredential.user.email);
    return userCredential.user; // Return user object
  } catch (error) {
    console.error("Error logging in:", error.code, error.message);

    // Specific error handling for login
    if (error.code === "auth/network-request-failed") {
      alert("Network error. Please check your internet connection.");
    } else if (error.code === "auth/user-not-found") {
      alert("No user found with this email. Please sign up.");
    } else if (error.code === "auth/wrong-password") {
      alert("Incorrect password. Please try again.");
    } else {
      alert(error.message || "An unknown error occurred during login.");
    }
    throw error; // Pass the error to the calling function
  }
};

// Function to log out the currently authenticated user
export const handleLogOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");

    // Log persistence test for logout
    console.log("Auth Persistence Test: User logged out");
  } catch (error) {
    console.error("Error logging out:", error.message);
    alert("Error logging out. Please try again.");
    throw error; // Pass the error to the calling function
  }
};

// Function to listen for authentication state changes
export const listenToAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Auth State Listener: User is authenticated:", user.email);
      callback(user); // Pass the user to the callback
    } else {
      console.log("Auth State Listener: No user is authenticated");
      callback(null); // Indicate no user is logged in
    }
  });
};

// Verify persistence on app initialization
export const verifyAuthPersistence = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("Auth Persistence Test: User session persists:", user.email);
    } else {
      console.log("Auth Persistence Test: No persistent session found");
    }
  });
};