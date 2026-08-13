// ---- Product domain ----
export interface Product {
    id: string;
    name: string;
    category: 'audio' | 'wearable' | 'accessory';
    price: number;      // in USD
    inStock: boolean;
}

// ---- Sort options ----
export type SortKey = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';
