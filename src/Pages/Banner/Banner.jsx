import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://github.com/ShariarNiaj05/BreakpointArt-Recipe-Client/blob/main/src/assets/freshly-grilled-cheeseburger-with-tomato-fries-generative-ai.jpg?raw=true)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">BreakpointArt Recipes</h1>
          <p className="mb-5">Where Every Dish is a Masterpiece</p>
          <Link to={"/all-recipe"}>
            <button className="btn bg-green-600 text-white hover:bg-green-400">
              See All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
