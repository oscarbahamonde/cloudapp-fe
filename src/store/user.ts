import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const savedUser = ref()
  var setUser = (user: any)=> {
    savedUser.value = user
  }
  var getUser = ()=> {
    return savedUser.value
  }
  return {
     setUser,
    getUser,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
