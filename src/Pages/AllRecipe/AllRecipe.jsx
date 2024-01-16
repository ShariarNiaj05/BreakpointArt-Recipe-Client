import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

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
  return (
    <div className=" max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10 ">
      {AllRecipe?.map((recipe) => (
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

          <button
            onClick={() => handleRecipeDelete(recipe._id, recipe?.title)}
            className=" btn bg-red-600 text-white hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllRecipe;
