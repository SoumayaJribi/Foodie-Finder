import "./MHome.css";
import ExploreMenu from "../ExploreMenu/ExploreMenu";
import { useState } from "react";
import FoodDisplay from "../FoodDisplay/FoodDisplay";

const MHome = () => {
  const [category, setCategory] = useState<string>("All");

  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} />
    </div>
  );
};
export default MHome;
