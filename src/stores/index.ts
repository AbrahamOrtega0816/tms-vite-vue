import { defineStore } from "pinia";
interface mainStore {
    token: string | null;
    loading: boolean;
    tokenExpiresIn:number
}

export const useStore = defineStore('main', {
    // global states
    state:() : mainStore => ({
       token:  null,
       tokenExpiresIn: 0,
       loading: false,
    }),

    getters: {
        getToken : async state => state.token,
        getLoading : state => state.loading,
    },

    actions:{
        async setToken(token:string) {
            this.token = token;
        },
        async setTokenExpiresIn(tokenExpiresIn:number) {
            this.tokenExpiresIn = tokenExpiresIn;
        },
        async setLoading(loading:boolean) {
            this.loading = loading;
        },
        async singOut() {
            this.token = null;
        },
    },
})

