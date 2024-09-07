export interface IProduct {
    name: string,
    id?: string,
    price: number | "",
    discountedPrice: number | "",
    quantity: number | "",
    category: string,
    image: string,
    description?: string
}
