import { NewPost, Post } from "@/types/Blog.types";
import { LocationType } from "@/types/Location.types";
import { Conversation, Message } from "@/types/Message.types";
import { AnimalType, Breed, NewPet, Pet } from "@/types/Pet.types";
import { Upload } from "@/types/Upload.types";
import { NewUser, User } from "@/types/User.types";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  DocumentData,
  collection,
  CollectionReference,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

export const usersCol = createCollection<User>("users");
export const newUserCol = createCollection<NewUser>("users");
export const petsCol = createCollection<Pet>("pets");
export const newPetsCol = createCollection<NewPet>("pets");
export const uploadsCol = createCollection<Upload>("uploads");
export const blogCol = createCollection<Post>("posts");
export const newBlogCol = createCollection<NewPost>("posts");
export const messageCol = createCollection<Message>("messages");
export const conversationCol = createCollection<Conversation>("conversations");
export const breedsCol = createCollection<Breed>("breeds");
export const animalTypeCol = createCollection<AnimalType>("animalType");
export const locationsCol = createCollection<LocationType>("locations");

export default app;
