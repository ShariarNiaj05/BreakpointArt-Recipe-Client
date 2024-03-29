import { useParams } from "react-router-dom";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import { imageUpload } from "../../API/imageUpload";
import { useQuery } from "@tanstack/react-query";
const EditRecipe = () => {
  const { id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [recipeDetails, setRecipeDetails] = useState({});

  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [],
    instruction: "",
  });

  // edit an existing recipe using the server side with tanstack query
  const { data } = useQuery({
    queryKey: ["recipe-details"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/recipe-details/${id}`);
      setRecipeDetails(res.data);
    },
  });

  const handleIngredientChange = (e) => {
    const selectedIngredients = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRecipe({ ...recipe, ingredients: selectedIngredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const instructions = form.instruction.value;

    const updatedRecipe = {
      title,
      instructions,
      ingredients: recipe.ingredients,
    };

    // update request in the backend server
    axiosSecure.put(`/update-recipe/${id}`, updatedRecipe).then((res) => {
      if (res.data.insertedId) {
        // console.log("Recipe added to DB");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Recipe Added",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      navigate("/all-recipe");
    });
  };

  const { title, instructions, ingredients } = recipeDetails;

  return (
    <div>
      <div className="max-w-screen-sm mx-auto">
        <form className="card-body" onSubmit={handleSubmit}>

          {/* title  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="title"
              placeholder="Title"
              name="title"
              className="input input-bordered"
              defaultValue={title}
              required
            />
          </div>

          {/* Ingredients */}
          <label className="label">
            <span className="label-text">Ingredients</span>
          </label>
          <select
            name="ingredients"
            placeholder="Ingredients"
            className="input input-bordered h-96"
            value={recipe.ingredients}
            defaultValue={ingredients}
            onChange={handleIngredientChange}
            multiple
          >
             {/* accessing all the ingredients from the stored array  */}
            {recipeIngredients?.map((ingredient) => (
              <option key={ingredient.id} value={ingredient.label}>
                {ingredient.label}
              </option>
            ))}
          </select>

          {/* Instruction */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Instruction</span>
            </label>
            <textarea
              name="instruction"
              cols="50"
              rows="100"
              defaultValue={instructions}
              placeholder="Instruction"
              className="input input-bordered"
              required
            ></textarea>
          </div>

          {/* <div>
            <label htmlFor="image" className="block mb-2 text-sm">
              Select Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
                          accept="image/*"
                          defaultValue={recipeImage}
              required
            />
          </div> */}

          <button type="submit" className="btn btn-primary">
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

const recipeIngredients = [
  { id: 1, label: "Flour" },
  { id: 2, label: "Eggs" },
  { id: 3, label: "Milk" },
  { id: 4, label: "Sugar" },
  { id: 5, label: "Butter" },
  { id: 6, label: "Salt" },
  { id: 7, label: "Yeast" },
  { id: 8, label: "Baking powder" },
  { id: 9, label: "Chocolate chips" },
  { id: 10, label: "Vanilla extract" },
  { id: 11, label: "Ghee" },
  { id: 12, label: "Mustard oil" },
  { id: 13, label: "Turmeric powder" },
  { id: 14, label: "Chili powder" },
  { id: 15, label: "Cumin seeds" },
  { id: 16, label: "Coriander seeds" },
  { id: 17, label: "Garlic" },
  { id: 18, label: "Ginger" },
  { id: 19, label: "Onions" },
  { id: 20, label: "Tomatoes" },
  { id: 21, label: "Potatoes" },
  { id: 22, label: "Chickpeas" },
  { id: 23, label: "Lentils" },
  { id: 24, label: "Rice" },
  { id: 25, label: "Fish" },
  { id: 26, label: "Chicken" },
  { id: 27, label: "Beef" },
  { id: 28, label: "Yogurt" },
  { id: 29, label: "Lime juice" },
  { id: 30, label: "Coconut milk" },
  { id: 31, label: "Bananas" },
  { id: 32, label: "Mangoes" },
  { id: 33, label: "Panch Phoron" },
  { id: 34, label: "Bay leaves" },
  { id: 35, label: "Green chilies" },
  { id: 36, label: "Cilantro" },
  { id: 37, label: "Mint leaves" },
  { id: 38, label: "Shrimp" },
  { id: 39, label: "Hilsa fish" },
  { id: 40, label: "Begun" },
  { id: 41, label: "Aloo" },
  { id: 42, label: "Doi" },
];

export default EditRecipe;
