import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Make sure your `firebase.js` file is properly configured


// Save or Create User Data
const validateFields = (data, requiredFields) => {
  return requiredFields.filter((field) => !data[field]); // Returns missing fields
};

export const saveUserData = async (userId, userData) => {
  try {
    if (userData.role === "Business Owner") {
      const missingFields = validateFields(userData, [
        "businessName",
        "businessType",
        "location",
        "guidelines",
        "prices",
        "contactUs",
      ]);

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }
    }

    const userRef = doc(db, "users", userId);
    console.log("Saving user data:", userData); // Debug data
    await setDoc(userRef, userData);

    console.log("User data saved successfully!");
  } catch (error) {
    console.error("Error saving user data:", error.message);
    throw error; // Re-throw for handling in the calling function
  }
};


// Read User Data
export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, "users", userId); // Reference to the user's document
    const docSnap = await getDoc(userRef); // Fetch document data

    if (docSnap.exists()) {
      console.log("User data retrieved:", docSnap.data());
      return docSnap.data(); // Return the document data
    } else {
      throw new Error("No such user document!");
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    throw error; // Rethrow for handling in the calling function
  }
};

// Update User Data
export const updateUserData = async (userId, updatedData) => {
  try {
    const userRef = doc(db, "users", userId); // Reference to the user's document
    await updateDoc(userRef, updatedData); // Update document in Firestore
    console.log("User data updated:", updatedData);
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

// Delete User Data
export const deleteUserData = async (userId) => {
  try {
    const userRef = doc(db, "users", userId); // Reference to the user's document
    await deleteDoc(userRef); // Delete the document
    console.log("User data deleted for userId:", userId);
  } catch (error) {
    console.error("Error deleting user data:", error);
    throw error;
  }
};

// Retrieve All Users (Example)
export const getAllUsers = async () => {
  try {
    const usersCollection = collection(db, "users"); // Reference to the "users" collection
    const querySnapshot = await getDocs(usersCollection); // Get all documents

    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document data
    }));
    console.log("All users retrieved:", users);
    return users;
  } catch (error) {
    console.error("Error retrieving all users:", error);
    throw error;
  }
};
