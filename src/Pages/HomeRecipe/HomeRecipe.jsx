import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const HomeRecipe = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: AllRecipe,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-recipe", searchQuery],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/all-recipe?search=${searchQuery}`
      );
      return data;
    },
  });

  const homeSliceRecipe = AllRecipe?.slice(0, 8);
  return (
    <div>
      <h2 className=" font-bold text-4xl text-green-400 mt-5 text-center">
        Our Recipe
      </h2>
      <div className=" max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10 w-5/6">
        {homeSliceRecipe?.map((recipe) => (
          <div className="rounded shadow-lg p-3 " key={recipe._id}>
            <img
              className=" mb-2 h-64 mx-auto"
              src={recipe?.recipeImage}
              alt=""
            />
            <h2 className="mb-2 font-bold text-2xl">{recipe?.title}</h2>
            <Link to={`/recipe-details/${recipe._id}`}>
              <button className=" btn bg-green-600 text-white hover:bg-green-400">
                View Details
              </button>
            </Link>

            <Link to={`/edit-recipe/${recipe._id}`}>
              <button className=" btn bg-sky-300 text-black hover:bg-sky-400">
                Edit Recipe
              </button>
            </Link>
          </div>
        ))}
      </div>
      <Link to={"/all-recipe"}>
        <button className=" btn bg-green-600 text-white hover:bg-green-400 flex mx-auto mt-5">
          Show All Recipe
        </button>
      </Link>
    </div>
  );
};

export default HomeRecipe;
