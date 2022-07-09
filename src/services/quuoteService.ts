import { AxiosInstance } from "axios";

const QuoteService = (api: AxiosInstance) => ({
  test: async () => {
    const response = await api.get(`/quote/quote-reference/`).then((res) => {
        return res;
    });
    return response;
  },
});

export default QuoteService;
