import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import AllRecipe from "../Pages/AllRecipe/AllRecipe";
import AddRecipe from "../Pages/AddRecipe/AddRecipe";
import RecipeDetails from "../Pages/RecipeDetails/RecipeDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-recipe",
        element: <AllRecipe></AllRecipe>,
      },
      {
        path: "/add-recipe",
        element: <AddRecipe></AddRecipe>,
      },
      {
        path: "/recipe-details/:id",
        element: <RecipeDetails></RecipeDetails>
      },
    ],
  },
]);

export default router;
