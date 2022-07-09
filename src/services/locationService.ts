import { Location } from "@/common/models/locationModel";
import axios, { AxiosResponse } from "axios";

interface ILocation {
  in: string;
  q: string | number;
  apiKey: string;
  types: string;
}

const HereMapsService = () => ({
  getAutocompleteLocation: async (query: ILocation) => {
    const res: AxiosResponse<Location> = await axios.get(
      "https://autocomplete.search.hereapi.com/v1/autocomplete",
      { params: query }
    );
    return res;
  },
});

export default HereMapsService;
