import type { Product } from "../types/product";

// ---- Seed data to render ----
export const PRODUCTS: Product[] = [
    {
        id: "1",
        name: "sony walk-man",
        category: 'audio',
        price: 49.99,
        inStock: true
    },
    {
        id: "2",
        name: "ipod",
        category: 'audio',
        price: 29.99,
        inStock: true
    },
    {
        id: "3",
        name: "watch",
        category: 'wearable',
        price: 9.99,
        inStock: true
    },
    {
        id: "4",
        name: "bracelet",
        category: 'wearable',
        price: 109.99,
        inStock: true
    },
    {
        id: "5",
        name: "speakers",
        category: 'audio',
        price: 69.99,
        inStock: true
    },
    {
        id: "6",
        name: "jeans",
        category: 'wearable',
        price: 19.99,
        inStock: false
    }
];