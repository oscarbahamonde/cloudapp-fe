<template>
  <div v-if="!user.photoURL" @click.prevent="login">
    <Icon
      icon="logos:google-icon"
      title="login"
      m-2
      w-8
      h-8
      dark:invert
      hover:scale-125
      hover:transition-all
      hover-ease-in-out
      cursor-pointer
      fixed
      right-0
      bottom-0
    />
  </div>
  <div v-else>
    <div v-if="menu">
      <h1 bottom-40 right-4 fixed font-serif text-gray-500>
        {{ user.displayName }}
      </h1>
      <h2 bottom-32 right-4 fixed font-mono text-sm text-gray-500>
        {{ user.email }}
      </h2>
    </div>
    <div
      rounded-full
      w-16
      h-16
      cursor-pointer
      fixed
      right-0
      bottom-0
      m-2
      @click.prevent="toggleMenu"
    >
      <img rounded-full :src="user.photoURL" />
    </div>

    <div
      v-if="menu"
      delay-1
      right-0
      bottom-16
      m-4
      fixed
      btn
      bg-red-500
      text-white
      hover:border-2
      hover:border-red-500
      hover:text-red
      hover:bg-transparent
      @click.prevent="logout"
    >
      Logout
    </div>
  </div>

  <div></div>
</template>
<script setup lang="ts">
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { useUserStore } from "~/store/user";
import { User } from "~/types";
const store = useUserStore();
const user = ref(store.getUser());
const menu = ref(false);

const cfg = {
  apiKey: "AIzaSyC-EWWaIHK_yLZMM9EAMhzSH7cyYc6exls",
  authDomain: "intaas-880b3.firebaseapp.com",
  databaseURL: "https://intaas-880b3-default-rtdb.firebaseio.com",
  projectId: "intaas-880b3",
  storageBucket: "intaas-880b3.appspot.com",
  messagingSenderId: "244469163250",
  appId: "1:244469163250:web:2fd9dc63e68510a6e4dc6b",
  measurementId: "G-DCT8N5SDFE",
};

const auth = getAuth(initializeApp(cfg));

const login = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const usr = {
    uid: result.user.uid,
    displayName: result.user.displayName,
    email: result.user.email,
    photoURL: result.user.photoURL,
  };

  store.setUser(usr);
  user.value = usr;
};

const toggleMenu = () => {
  menu.value = !menu.value;
};

const logout = () => {
  signOut(auth);
  store.setUser(null);
  user.value = null;
};
</script>
