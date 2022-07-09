import instance from "./axiosManager";
import HereMapsService from "./locationService";
import QuoteService from "./quuoteService";

const axios = instance;

export const quoteService = QuoteService(axios);
export const hereMapsService  = HereMapsService()