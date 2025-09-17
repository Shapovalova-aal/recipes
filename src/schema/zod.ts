import {  z } from "zod"
 
export const signInSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string()
    .min(1, "Password is required")
    .min(6, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})
export const ingredientSchema = z.object({
    name: z.string().min(1, 'Название обязательно'),
    category: z.enum([
        "VEGETABLES",
        "FRUITS",
        "MEAT",
        "DAIRY",
        "SPICES",
        "OTHER"
    ]),
    unit: z.enum([
        "GRAMS",
        "KILOGRAMS",
        "LITERS",
        "MILLILITERS",
        "PIECES"
    ]),
    pricePerUnit: z.coerce.number()
    .min(0,'Цена должна быть положительной')
    .nullable(),
    description: z.string().optional()
})