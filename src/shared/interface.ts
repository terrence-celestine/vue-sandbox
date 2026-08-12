// ---- Domain types ----
export interface Product {
    id: string;
    name: string;
    category: 'audio' | 'wearable' | 'accessory';
    price: number;      // in USD
    inStock: boolean;
}