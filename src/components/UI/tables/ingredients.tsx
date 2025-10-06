"use client";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";
import { useAuthStore } from "@/store/auth.store";
import { useIngredientStore } from "@/store/ingredient.store";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

const IngredientsTable = () => {
  const { ingredients, removeIngredient, isLoading } = useIngredientStore();
  const { isAuth } = useAuthStore();

  const handleDelete = async (id: string) => {
    await removeIngredient(id);
  };
  const getCategoryLabel = (value: string) => {
    const option = CATEGORY_OPTIONS.find((opt) => opt.value === value);
    return option ? option.label : value;
  };
  const getUnitLabel = (value: string) => {
    const option = UNIT_OPTIONS.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  if (!isAuth) {
    return <p>Не авторизован</p>;
  }

  return !isLoading && isAuth ? (
    <div className="w-full mt-4 overflow-x-auto">
      <Table
        aria-label="Список ингредиентов"
        classNames={{
          wrapper: "w-full",
          base: "block md:table w-full",
          table: "w-full border-collapse",
          th: "hidden md:table-cell bg-gray-100 text-black p-2",
          td: "block p-0 text-black border-b border-gray-200 last:border-0 md:table-cell md:last:border-b ",
        }}
      >
        <TableHeader>
          <TableColumn>Название</TableColumn>
          <TableColumn>Категория</TableColumn>
          <TableColumn>Ед. изм.</TableColumn>
          <TableColumn>Цена за единицу</TableColumn>
          <TableColumn>Описание</TableColumn>
          <TableColumn>Действия</TableColumn>
        </TableHeader>
        <TableBody>
          {ingredients.map((ingredient) => (
            <TableRow
              key={ingredient.id}
              className="block md:table-row border md:border-0 rounded-lg md:rounded-none mb-4 md:mb-0"
            >
              <TableCell data-label="Название" className="block md:table-cell">
                <div className="flex md:block ">
                  <div className="w-1/3 md:hidden bg-gray-100 text-gray-500 font-semibold p-2 ">
                    Название
                  </div>
                  <div className="w-2/3 md:w-full p-2">{ingredient.name}</div>
                </div>
              </TableCell>
              <TableCell data-label="Категория" className="block md:table-cell">
                <div className="flex md:block ">
                  <div className="w-1/3 md:hidden bg-gray-100 text-gray-500 font-semibold p-2 ">
                    Категория
                  </div>
                  <div className="w-2/3 md:w-full p-2">
                    {getCategoryLabel(ingredient.category)}
                  </div>
                </div>
              </TableCell>
              <TableCell data-label="Ед. изм." className="block md:table-cell">
                <div className="flex md:block ">
                  <div className="w-1/3 md:hidden bg-gray-100 text-gray-500 font-semibold p-2 ">
                    Ед. изм.
                  </div>
                  <div className="w-2/3 md:w-full p-2">
                    {getUnitLabel(ingredient.unit)}{" "}
                  </div>
                </div>
              </TableCell>
              <TableCell data-label="Цена" className="block md:table-cell">
                <div className="flex md:block ">
                  <div className="w-1/3 md:hidden bg-gray-100 text-gray-500 font-semibold p-2 ">
                    Цена
                  </div>
                  <div className="w-2/3 md:w-full p-2">
                    {ingredient.pricePerUnit !== null
                      ? `${ingredient.pricePerUnit} ₽`
                      : "-"}{" "}
                  </div>
                </div>
              </TableCell>
              <TableCell data-label="Описание" className="block md:table-cell">
                <div className="flex md:block ">
                  <div className="w-1/3 md:hidden bg-gray-100 text-gray-500 font-semibold p-2 ">
                    Описание
                  </div>
                  <div className="w-2/3 md:w-full p-2">
                    {ingredient.description || "-"}{" "}
                  </div>
                </div>
              </TableCell>
              <TableCell data-label="Действия" className="block md:table-cell">
                <div className="flex md:block ">
                  <div className="w-1/3 md:hidden bg-gray-100 text-gray-500 font-semibold p-2 ">
                    Действия
                  </div>
                  <div className="w-2/3 md:w-full p-2 flex justify-end">
                    <Button
                      color="danger"
                      size="sm"
                      onPress={() => {
                        handleDelete(ingredient.id);
                      }}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ) : (
    <p className="mt-4">Загрузка...</p>
  );
};

export default IngredientsTable;
