import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMJxDAKBOKuMghWs43MAKav5nvrTdkWVM",
  authDomain: "auntypanel.firebaseapp.com",
  projectId: "auntypanel",
  storageBucket: "auntypanel.appspot.com",
  messagingSenderId: "918961137047",
  appId: "1:918961137047:web:6419713721505deaeed0d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export async function uploadFileAndGetURL(name, uri) {
  try {
    const blob = await fetch(uri).then((res) => res.blob());
    // const blob = await response.blob();
    const fileName = blob.data.name;
    const fileType = fileName.slice(fileName.lastIndexOf("."));

    // const imagesRef = ref(storage, 'images');
    const fileRef = ref(storage, `images/${name + fileType}`);
    console.log("Ref");
    const result = await uploadBytes(fileRef, blob);
    return await getDownloadURL(fileRef);
  } catch (err) {
    console.log(err);
  }
}

export { app, storage };
