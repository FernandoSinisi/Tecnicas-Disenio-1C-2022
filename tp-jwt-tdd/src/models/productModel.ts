export type Brand = {
    code: string;
    name: string;
}

export type Category = {
    code: string;
    name: string;
}

export type Product = {
    name: string;
    brand: Brand;
    category: Category;
    price: number;
    iva_percentage: number;
    code: string
}
