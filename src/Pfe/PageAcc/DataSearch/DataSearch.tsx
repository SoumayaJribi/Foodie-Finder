import { Link } from "react-router-dom";
import resto from "../../../assets/restaurant_4.jpg";
import "./DataSearch.css";

type Item = {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  openingHours: string;
  cuisineType: string;
  imageUrl: string;
  status: "APPROVED";
  ownerId: number;
};

type Props = {
  data: Item[];
};

const DataSearch = ({ data }: Props) => {
  return (
    <div className="data-search">
      <h1 className="section-title">Result list</h1>

      <div className="cards">
        {data.map((item) => (
          <Link
            to={`/restaurant/${item.id}`}
            key={item.id}
            className="card-link"
          >
            <div className="card">
              <img src={item.imageUrl || resto} alt={`${item.name}`} />
              <span className="cuisine-type">Type: {item.cuisineType}</span>
              <p className="name">Name: {item.name}</p>
              <p className="address">Address: {item.address}</p>
              <p className="opening-hours">
                Opening hours: {item.openingHours}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DataSearch;
