"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
  User,
} from "firebase/auth";

import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { auth, usersCol, newUserCol } from "../services/firebase";
import { MoonLoader } from "react-spinners";
import {
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

interface AuthContextType {
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  setEmail: (email: string, id: string) => Promise<void>;
  setDisplayName: (name: string, id: string) => Promise<void>;
  setPassword: (password: string) => Promise<void>;
  reloadUserData: () => boolean;
  currentUser: User | null;
  userEmail: string | null;
  userName: string | null;
  userId: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const signup = async (email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const docRef = doc(newUserCol);
    await setDoc(docRef, {
      email: user.email,
      uid: user.uid,
    });

    setUserId(docRef.id);
  };

  const login = async (email: string, password: string) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    const queryRef = query(usersCol, where("uid", "==", user.uid));
    const snapshot = await getDocs(queryRef);

    setUserId(snapshot.docs[0].id);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email, {
      url: window.location.origin + "/logIn",
    });
  };

  const logout = () => {
    return signOut(auth);
  };

  const setEmail = async (email: string, id: string) => {
    if (!currentUser) {
      throw new Error("Can't update email if you're not logged in");
    }

    const docRef = doc(usersCol, id);
    const data = {
      email: email,
    };
    await updateDoc(docRef, data);

    await updateEmail(currentUser, email);
  };

  const setPassword = (password: string) => {
    if (!currentUser) {
      throw new Error("Can't update password if you're not logged in");
    }
    return updatePassword(currentUser, password);
  };

  const setDisplayName = async (name: string, id: string) => {
    if (!currentUser) {
      throw new Error("Can't update name if you're not logged in");
    }

    const docRef = doc(usersCol, id);
    const data = {
      name: name,
    };
    await updateDoc(docRef, data);

    await updateProfile(currentUser, { displayName: name });
  };

  const reloadUserData = () => {
    if (!currentUser) {
      return false;
    }

    setUserName(currentUser.displayName);
    setUserEmail(currentUser.email);
    return true;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        setUserEmail(user.email);
        setUserName(user.displayName);
      } else {
        setUserEmail(null);
        setUserName(null);
      }

      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        resetPassword,
        logout,
        setDisplayName,
        setEmail,
        setPassword,
        reloadUserData,
        currentUser,
        userEmail,
        userName,
        userId,
      }}
    >
      {loading ? (
        <div id="loader">
          <MoonLoader color={"#888"} size={25} speedMultiplier={1.1} />
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
