import { markRaw } from "vue";
import * as yup from "yup";

export interface ItemsForm {
  type: number;
  quantity: number | null;
  weight: number | null;
  length: number | null;
  width: number | null;
  height: number | null;
  declaredValue: number | null;
  description: string;
}
export interface AccessorialList {
  label: string;
  value: number | string;
}

export interface QuoteForm {
  originCountry: string;
  destinationCountry: string;
  origin: any;
  destination: any;
  pickupDate: number;
  paymentMethod: number;
  items: ItemsForm[];
  accessorials: AccessorialList[];
}

export const validationSchema = markRaw(
  yup.object({
    originCountry: yup.string().required(),
    destinationCountry: yup.string().required(),
    origin: yup.string().nullable(),
    destination: yup.string().nullable(),
    pickupDate: yup.number().required(),
    paymentMethod: yup.number().required(),
    items: yup.array().of(
      yup.object().shape({
        type: yup
          .number()
          .test("onlyNumber", "Number", (val) => (val ? Number(val) > 0 : true))
          .defined(),
        quantity: yup
          .number()
          .min(1)
          .required()
          .test("onlyNumber", "Number", (val) => (val ? Number(val) > 0 : true))
          .defined(),
        weight: yup
          .number()
          .max(43000)
          .min(1)
          .test("onlyNumber", "Number", (val) => (val ? Number(val) > 0 : true))
          .defined(),
        length: yup
          .number()
          .min(1)
          .max(288)
          .required()
          .test("onlyNumber", "Number", (val) => (val ? Number(val) > 0 : true))
          .defined(),
        width: yup
          .number()
          .min(1)
          .max(96)
          .required()
          .test("onlyNumber", "Number", (val) => (val ? Number(val) > 0 : true))
          .defined(),
        height: yup
          .number()
          .min(1)
          .max(96)
          .required()
          .test("onlyNumber", "Number", (val) => (val ? Number(val) > 0 : true))
          .defined(),
        declaredValue: yup
          .number()
          .test("onlyNumber", "Number", (val) => (val ? Number(val) > 0 : true))
          .defined(),
        description: yup.string().defined(),
      })
    ),
    accessorials: yup.array().of(yup.object()),
  })
);

export const itemsInitialValues = {
  type: 1,
  quantity: 1,
  weight: null,
  length: null,
  width: null,
  height: null,
  declaredValue: null,
  description: "",
};

export const quoteInitialValues: QuoteForm = {
  originCountry: "COL",
  destinationCountry: "COL",
  origin: null,
  destination: null,
  pickupDate: new Date().getTime(),
  paymentMethod: 0,
  items: [itemsInitialValues],
  accessorials: [],
};
