import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Additive {
    id: bigint;
    healthEffects: string;
    commonProducts: Array<string>;
    eNumber?: string;
    name: string;
    description: string;
    category: string;
}
export interface backendInterface {
    filterAdditivesByCategory(category: string): Promise<Array<Additive>>;
    getAdditiveByENumber(eNumber: string): Promise<Additive>;
    getAdditiveById(id: bigint): Promise<Additive>;
    getAllAdditives(): Promise<Array<Additive>>;
    parseIngredients(ingredientsText: string): Promise<Array<Additive>>;
    searchAdditivesByName(searchTerm: string): Promise<Array<Additive>>;
}
