import IngredientsTable from "@/components/UI/tables/ingredients";
import IngredientForm from "@/forms/ingredient.form";

const IngredientsPage = () => {
  return (
    <div className="w-full">
      <IngredientForm />
      <IngredientsTable />
    </div>
  );
};

export default IngredientsPage;
