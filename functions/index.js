const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();

exports.deleteUserDataOnAuthDelete = functions.auth.user().onDelete(async (user) => {
  try {
    console.log("User deletion triggered:", user);

    if (!user || !user.uid) {
      console.error("Invalid user object:", user);
      return;
    }

    const userId = user.uid;

    // 1. Delete Firestore Document
    const userRef = db.collection("users").doc(userId);
    const userSnapshot = await userRef.get();

    if (userSnapshot.exists) {
      await userRef.delete();
      console.log(`Successfully deleted Firestore data for userId: ${userId}`);
    } else {
      console.warn(`No Firestore document found for userId: ${userId}`);
    }

    // 2. Delete Storage Files
    const userStoragePath = `users/${userId}/`; // Replace with your specific folder structure
    const bucket = storage.bucket();
    const [files] = await bucket.getFiles({prefix: userStoragePath});

    if (files.length > 0) {
      console.log(`Found ${files.length} files in storage for userId: ${userId}`);
      const deletePromises = files.map((file) => file.delete());
      await Promise.all(deletePromises);
      console.log(`Successfully deleted all storage files for userId: ${userId}`);
    } else {
      console.warn(`No storage files found for userId: ${userId}`);
    }
  } catch (error) {
    console.error("Error deleting user data:", error);
  }
});
