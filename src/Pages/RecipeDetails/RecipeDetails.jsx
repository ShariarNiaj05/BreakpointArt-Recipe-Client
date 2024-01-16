import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const RecipeDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  //   console.log(id);
  const [recipeDetails, setRecipeDetails] = useState({});

  const { data } = useQuery({
    queryKey: ["recipe-details"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/recipe-details/${id}`);
      setRecipeDetails(res.data);
    },
  });

  const { title, instructions, recipeImage, ingredients } = recipeDetails;
  return (
    <div className=" max-w-screen-lg mx-auto p-2 shadow mt-10">
      <img
        className=" mx-auto justify-center items-center h-56"
        src={recipeImage}
        alt=""
      />
      <h2 className="mb-1 text-2xl font-bold text-green-600">{title}</h2>

      {ingredients?.map((ingredient, i) => (
        <ul key={i}>
          <li className=" font-bold">
            {i + 1 + `. `}
            {ingredient}
          </li>
        </ul>
      ))}

      <p className="text-xl mt-1">
        <b>Instructions: </b>
        {instructions}
      </p>
    </div>
  );
};

export default RecipeDetails;
