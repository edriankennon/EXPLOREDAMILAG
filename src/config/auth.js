  import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
  import { auth } from "./firebase"; // Import Firebase Auth instance

  // Function to sign up a new user
  export const handleSignUp = async (email, password) => {
    try {
      console.log("Attempting sign-up with email:", email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Sign-up successful:", userCredential.user);
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      return userCredential.user; // Return user object
    } catch (error) {
      console.error("Error logging in:", error);
      throw error; // Pass the error to the calling function
    }
  };

  // Function to log out the currently authenticated user
  export const handleLogOut = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error; // Pass the error to the calling function
    }
  };

  // Function to listen for authentication state changes
  export const listenToAuthState = (callback) => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is authenticated:", user);
        callback(user); // Pass the user to the callback
      } else {
        console.log("No user is authenticated");
        callback(null); // Indicate no user is logged in
      }
    });
  };
