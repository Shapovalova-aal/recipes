import { IIngredient } from "./ingredient";

export interface IRecipeIngredient{
    id: string;
    ingredientId: string;
    quantity: number;
    ingredient: IIngredient;
    // unit:string;
}

export interface IRecipe{
    id: string;
    name: string;
    description: string;
    imageUrl?: string | null;
    userId: string;
    ingredients: IRecipeIngredient[];
}