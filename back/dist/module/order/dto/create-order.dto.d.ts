declare class ProductDto {
    id: string;
}
export declare class CreateOrderDto {
    id?: string;
    userId: string;
    products: ProductDto[];
}
export {};
