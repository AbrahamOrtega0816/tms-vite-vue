import { markRaw } from "vue";
import * as yup from "yup";

export interface ItemsForm {
  quantity: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  description: string;
}

export interface QuoteForm {
  originCountry: string;
  destinationCountry: string;
  origin: any;
  destination: any;
  pickupDate: number;
  items: ItemsForm[] ;
}

export const validationSchema = markRaw(
  yup.object({
    originCountry: yup.string().required(),
    destinationCountry: yup.string().required(),
    origin: yup.string().nullable(),
    destination: yup.string().nullable(),
    pickupDate: yup.number().required(),
    items: yup.array().of(
      yup.object().shape({
        quantity: yup
          .number()
          .min(1)
          .required()
          .test("onlyNumber", "Number", (val) =>
            val ? Number(val) > 0 : true
          ).defined(),
        weight: yup
          .number()
          .max(43000)
          .min(1)
          .test("onlyNumber", "Number", (val) =>
            val ? Number(val) > 0 : true
          ).defined(),
        length: yup
          .number()
          .min(1)
          .max(288)
          .required()
          .test("onlyNumber", "Number", (val) =>
            val ? Number(val) > 0 : true
          ).defined(),
        width: yup
          .number()
          .min(1)
          .max(96)
          .required()
          .test("onlyNumber", "Number", (val) =>
            val ? Number(val) > 0 : true
          ).defined(),
        height: yup
          .number()
          .min(1)
          .max(96)
          .required()
          .test("onlyNumber", "Number", (val) =>
            val ? Number(val) > 0 : true
          ).defined(),
        description: yup.string().defined(),
      })
    ),
  })
);

export const itemsInitialValues = {
  quantity: 1,
  weight: null,
  length: null,
  width: null,
  height: null,
  description: "",
};

export const quoteInitialValues = {
  originCountry: "COL",
  destinationCountry: "COL",
  origin: null,
  destination: null,
  pickupDate: new Date().getTime(),
  items: [itemsInitialValues],
};
