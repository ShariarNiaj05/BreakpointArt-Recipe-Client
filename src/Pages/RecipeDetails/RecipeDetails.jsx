import React from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const {id} = useParams()
    console.log(id);
    return (
        <div>
            
        </div>
    );
};

export default RecipeDetails;