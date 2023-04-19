export declare class userCartDto {
    productId: string;
    quantity: number;
}
declare const addCartDto_base: import("@nestjs/common").Type<Pick<userCartDto, "productId" | "quantity">>;
export declare class addCartDto extends addCartDto_base {
    userId: string;
}
export {};
