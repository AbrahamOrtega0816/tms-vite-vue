import { defineStore } from "pinia";
interface mainStore {
    token: string | null;
    loading: boolean;
}

export const useStore = defineStore('main', {
    // global states
    state:() : mainStore => ({
       token: localStorage.getItem("token") || null,
       loading: false,
    }),

    getters: {
        isAuthenticated : state => state.token,
        getToken : state => state.token,
        getLoading : state => state.loading,
    },

    actions:{
        async setToken(token:string) {
            this.token = token;
        },
        async setLoading(loading:boolean) {
            this.loading = loading;
        },
        async singOut() {
            this.token = null;
        }
    },

    persist: true,
    
})

