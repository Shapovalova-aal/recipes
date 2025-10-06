"use client";

import { UNIT_ABBREVIATIONS } from "@/constants/select-options";
import { useRecipeStore } from "@/store/recipe.store";
import { IRecipe } from "@/types/recipe";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const RecipeViewPage = () => {
  const { slug } = useParams<{ slug: string[] }>();
  const [name, id] = slug;
  const { recipes, isLoading, error } = useRecipeStore();
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (recipes.length > 0 || error) {
      const foundRecipe = recipes.find((r) => r.id === id);
      setRecipe(foundRecipe || null);
      setHasSearched(true);
    }
  }, [recipes, id, error]);

  if (isLoading) return <p className="text-center">Загрузка...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (hasSearched && !recipe) {
    return <p className="text-red-500 text-center">Рецепт не найден</p>;
  }
  const getUnitLabel = (unit: string) => {
    const unitOption = UNIT_ABBREVIATIONS.find(
      (option) => option.value === unit
    );
    return unitOption ? unitOption.label : unit.toLowerCase();
  };

  if (recipe) {
    return (
      <div className="container mx-auto p-4">
        {/* min-w-150 */}
        <div className="h-90 overflow-hidden mb-4">
          {recipe.imageUrl ? (
            <div className="relative h-90 group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
              <Image
                src={recipe.imageUrl}
                alt="Image for recipe"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Нет изображения</span>
            </div>
          )}
        </div>

        <p className="line-clamp-6">{recipe.description || "Без описания"}</p>
        <h3 className="mt-4 font-semibold">Ингредиенты:</h3>
        <ul className="list-disc pl-5 overflow-y-auto max-h-24">
          {recipe.ingredients.map((ing) => (
            <li key={ing.id}>
              {ing.ingredient.name}: {ing.quantity}{" "}
              {getUnitLabel(ing.ingredient.unit)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <p className="text-center">Загрузка...</p>;
};

export default RecipeViewPage;
