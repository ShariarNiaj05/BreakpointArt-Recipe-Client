import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AllRecipeBanner from "./AllRecipeBanner";
import { useState } from "react";

const AllRecipe = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");

  // getting all the recipe using server side request with tanstack query
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
  const handleRecipeDelete = async (id, title) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/recipe/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: `${title} has been deleted.`,
          icon: "success",
        });
        refetch();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div>
      <AllRecipeBanner></AllRecipeBanner>
      <h2 className=" font-bold text-4xl text-green-400 mt-5 text-center">
        All Recipe
      </h2>
      <div className=" flex flex-col md:flex-row max-w-screen-2xl mx-auto">
        <div className=" w-1/6">
          {/*  search function using ingredients and title  */}
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search by title or ingredients"
              value={searchQuery}
              onChange={handleSearchChange}
              className="input input-bordered"
            />
            <button type="submit" className="btn bg-green-600 text-white">
              Search
            </button>
          </form>
        </div>
        
        {/* all the available recipe showing  */}
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10 w-5/6">
          {AllRecipe?.map((recipe) => (
            <div className="rounded shadow-lg p-3 " key={recipe._id}>
              <img
                className=" mb-2 h-64 mx-auto object-cover"
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

              <button
                onClick={() => handleRecipeDelete(recipe._id, recipe?.title)}
                className=" btn bg-red-600 text-white hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRecipe;
