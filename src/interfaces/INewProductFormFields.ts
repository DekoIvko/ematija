export interface INewProductFormFields {
    id?: number;
    title: string;
    category: string;
    brand: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    discountPercentage: number,
    images: [],
    thumbnail: string,
    address: TestPlaces
}

interface TestPlaces {
    city: string;
    address: string;
    phone: string;
}