export interface IProduct {
    name: string,
    id?: string,
    quantity: string | undefined,
    price: string | undefined,
    discountedPrice: string | undefined,
    category: string,
    image: string,
    description?: string
}
