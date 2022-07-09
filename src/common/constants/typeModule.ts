export interface Imodule {
    id: number,
    name: string
}
interface ITypesmodules {
    quote: Imodule,
    shipment: Imodule
}

export const typeModules : ITypesmodules = {
    quote :  {
        id: 1,
        name: "Quote"
    },
    shipment :  {
        id: 2,
        name: "Shipment"
    },
}