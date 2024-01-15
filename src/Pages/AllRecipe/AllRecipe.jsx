import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllRecipe = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: AllRecipe,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-recipe"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-recipe");
      return data;
    },
  });
  console.log(AllRecipe);
  // const { title, instructions, ingredients, recipeImage } = AllRecipe;
  return (
    <div className=" max-w-screen-2xl mx-auto">
      {AllRecipe?.map((recipe) => (
        <div key={recipe._id}>
          <img src={recipe?.recipeImage} alt="" />
          <h2>{recipe?.title}</h2>
          <Link to={`/recipe-details/${recipe._id}`}>
            <button>View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllRecipe;
