import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Import Firebase storage configuration

// Upload Profile Photo
export const uploadProfilePhoto = async (userId, uri) => {
  try {
    // Validate inputs
    if (!userId || !uri) {
      throw new Error("Missing userId or uri for profile photo upload.");
    }

    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error("Failed to fetch the image URI.");
    }

    const blob = await response.blob();
    const photoRef = ref(storage, `profilePhotos/${userId}`); // Path to store the profile photo
    await uploadBytes(photoRef, blob);

    const downloadUrl = await getDownloadURL(photoRef);
    console.log("Profile photo uploaded successfully:", downloadUrl);
    return downloadUrl; // Return the URL for the uploaded photo
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    throw error; // Propagate the error for further handling
  }
};

// Upload Business Images
export const uploadBusinessImages = async (userId, images) => {
  try {
    // Validate inputs
    if (!userId || !images || !Array.isArray(images) || images.length === 0) {
      throw new Error("Missing userId or images for business image upload.");
    }

    const uploadedImages = [];
    for (const uri of images) {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`Failed to fetch the image URI: ${uri}`);
      }

      const blob = await response.blob();
      const timestamp = Date.now(); // Use a timestamp to make filenames unique
      const imageRef = ref(storage, `businessImages/${userId}/${timestamp}`); // Path for each image
      await uploadBytes(imageRef, blob);

      const downloadUrl = await getDownloadURL(imageRef);
      uploadedImages.push(downloadUrl); // Add the URL to the uploaded images array
    }

    console.log("Business images uploaded successfully:", uploadedImages);
    return uploadedImages; // Return the array of URLs for the uploaded images
  } catch (error) {
    console.error("Error uploading business images:", error);
    throw error; // Propagate the error for further handling
  }
};
