import { useParams } from "react-router-dom";

const EditRecipe = () => {

    const { id } = useParams()
    console.log(id);
    return (
        <div>
            
        </div>
    );
};

export default EditRecipe;