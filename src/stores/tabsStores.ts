import { defineStore } from "pinia";

interface mainStore {
    token: string | null
}

export const useStore = defineStore('main', {
    // global states
    state:() : mainStore => ({
       token: localStorage.getItem("token") || null,
    }),

    getters: {
        isAuthenticated : state => state.token,
    },

    actions:{
        async setToken(token:string) {
            this.token = token;
        },
        async singOut() {
            this.token = null;
        },
    },

    persist: true,
    
})

