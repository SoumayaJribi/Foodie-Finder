import resto from "../../../assets/restaurant_4.jpg";
import "./DataSearch.css";

type item = {
  id: number;
  name: string;
  adress: string;
  phoneNumber: string;
  email: string;
  openingHours: string;
  cuisineType: string;
  imageUrl: string;
  status: "APPROVED";
  ownerId: number;
};

type props = {
  data: item[];
};

const DataSearch = ({ data }: props) => {
  return (
    <div className="data-search">
      <h1 className="section-title">Result list </h1>

      <div className="cards">
        {data.map((item) => {
          return (
            <div className="card">
              <img src={item?.imageUrl || resto} />
              <span className="cuisine-type">Type : {item?.cuisineType}</span>
              <p className="name">Name : {item?.name}</p>
              <p className="address">Address : {item?.adress}</p>
              <p className="opening-hours">
                Opening hours : {item?.openingHours}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataSearch;
