import { Imodule , typeModules } from "@/common/constants/typeModule";
import { defineStore } from "pinia";
import route from "@/router";
import { QuoteForm, quoteInitialValues } from "@/common/models/quoteModel";
import { cloneDeep } from "lodash";

export type TabInfo = {
    id: number;
    name: string;
    moduleId: number;
    moduleName:string;
    isNew: boolean;
    data: any;
};

interface tabStore {
    tabs: Array<TabInfo>,
    tabIndex: number;
}

export const useStore = defineStore('tabStore', {
    // global states
    state:() : tabStore => ({
        tabs: [],
        tabIndex: 0
    }),

    getters: {
        getTabs : state => state.tabs,
        getCurrentTabIndex : state => state.tabIndex,
    },

    actions:{
        async addTab(module : Imodule) {
            
            const id = this.tabs.length
              ? Math.max(...this.tabs.map((t) => (t.isNew ? t.id : 0))) + 1
              : 1;
        
            this.tabs.push({
              id,
              name: `New ${module.name} ${id}`,
              moduleId : module.id,
              moduleName : module.name,
              data: module.id === typeModules.quote.id ? {...quoteInitialValues} : {},
              isNew: true,
            });

            if(this.tabIndex === 0) this.tabIndex = this.tabs.length;
        },
        async removeTab(id : number) {
         const idx = this.tabs.findIndex((t) => t.id === id);
         if(this.tabs.length === 1) {
            this.tabIndex = 0;
            route.push('/')
         }
         if(idx > -1) this.tabs.splice(idx, 1);
        },
        async setCurrentIndex(idx : number){
          this.tabIndex = idx;
        },
        async changeCurrentTab(idx : number) {
            if(this.tabIndex > 0 && idx > 0) {
                const { id, moduleName } = this.tabs.find((t) => t.id === idx) as unknown as TabInfo || {};
                if(id && moduleName) route.push(`/new/${moduleName.toLowerCase()}/${id}`);
            }
        },
        async setCurrentDataInTab(tabId : number, tabData: QuoteForm) {
            if(this.tabIndex > 0) {
               const id = this.tabs.findIndex((t) => t.id === tabId);
               this.tabs[id].data = {...tabData}
            }
        },
        getCurrentDataInTab(tabId : number) {
            if(this.tabIndex > 0) {
                return cloneDeep(this.tabs.find((t) => t.id === tabId)?.data);
            }
            return quoteInitialValues
        },
    }, 

    persist: true,
})

