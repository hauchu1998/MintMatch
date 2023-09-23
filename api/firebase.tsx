import React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set, remove } from "firebase/database";
import { queryClient } from "@/pages/_app";

const firebaseConfig = {
  apiKey: "AIzaSyDh9NL6OQtZqrXHD-8Pa9CF0SzHIMOZaTo",
  authDomain: "mintmatch-c22a6.firebaseapp.com",
  databaseURL: "https://mintmatch-c22a6-default-rtdb.firebaseio.com",
  projectId: "mintmatch-c22a6",
  storageBucket: "mintmatch-c22a6.appspot.com",
  messagingSenderId: "934249536690",
  appId: "1:934249536690:web:0166ff5750fab60cd7fdab",
  measurementId: "G-GCBSY7KDQX",
};

const app = initializeApp(firebaseConfig);

export const fetchUserProfiles = async (address: string) => {
  //get profile by address
  const dbRef = ref(getDatabase(app));
  const snapshot = await get(child(dbRef, `profile/${address}`));
  return snapshot.val() || {};
};

export const updateUserProfile = async (address: string, profile: any) => {
  const dbRef = ref(getDatabase(app), `profile/${address}`);
  const res = await set(dbRef, { address, ...profile });
  // await queryClient.fetchQuery({
  //   queryKey: fetchUserProfiles(address),
  //   queryFn: () => dasByOwnerQueryFn(network, owner),
  // })
  return res;
};

// export const delete_profile = async (address: string) => {
//   const dbRef = ref(getDatabase(app), `profile/${address}`);
//   const res = remove(dbRef);
// };
