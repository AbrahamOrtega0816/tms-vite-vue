import instance from "./axiosManager";
import HereMapsService from "./locationService";
import AuthService from "./authService";
import QuoteService from "./quuoteService";

const axios = instance;

export const quoteService = QuoteService(axios);
export const authService = AuthService(axios);
export const hereMapsService  = HereMapsService()