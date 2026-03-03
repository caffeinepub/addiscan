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
    alternatives: Array<string>;
}
export interface backendInterface {
    addAdditive(name: string, eNumber: string | null, category: string, description: string, healthEffects: string, commonProducts: Array<string>, alternatives: Array<string>): Promise<bigint>;
    deleteAdditive(id: bigint): Promise<boolean>;
    filterAdditivesByCategory(category: string): Promise<Array<Additive>>;
    getAdditiveByENumber(eNumber: string): Promise<Additive>;
    getAdditiveById(id: bigint): Promise<Additive>;
    getAllAdditives(): Promise<Array<Additive>>;
    parseIngredients(text: string): Promise<Array<Additive>>;
    searchAdditivesByName(searchTerm: string): Promise<Array<Additive>>;
    updateAdditive(id: bigint, name: string, eNumber: string | null, category: string, description: string, healthEffects: string, commonProducts: Array<string>, alternatives: Array<string>): Promise<boolean>;
}
