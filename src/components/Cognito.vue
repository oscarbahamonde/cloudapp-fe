<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "~/store/user";
import { User } from "~/types";
const route = useRoute();
const token: any = route.query.token;
const store = useUserStore();
const user = ref(store.getUser());

onMounted(async () => {
  if (token) {
    const usr = await fetch("/api/token?token=" + token, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    if (usr) {
      const u: User = {
        uid: usr.UserAttributes[0].Value,
        displayName: usr.Username,
        email: usr.UserAttributes[2].Value,
      };
      store.setUser(u);
      user.value = u;
    }
  }
});
</script>

<template>
  <div v-if="!user">
    <a
      href="https://smartprocloud.auth.us-east-1.amazoncognito.com/login?client_id=6d4rt7sphoaihhcj5on3ghb727&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://smartpro.solutions/token"
    >
      <Icon
        icon="mdi-account"
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
    </a>
  </div>
  <div
    v-else-if="user"
    fixed
    m-2
    bottom-0
    left-0
    p-2
    bg-teal-500
    shadow-gray-500
    shadow-lg
    text-black
    rounded
    z-index-1
  >
    <h1 text-xs font-serif>
      {{ user.displayName }}
    </h1>
    <h2 text-xs font-mono>
      {{ user.email }}
    </h2>
  </div>
</template>
