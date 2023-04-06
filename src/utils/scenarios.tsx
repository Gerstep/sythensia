import { useState } from "react";
import axios from "axios";

const Scenarios = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/imagine-scenarios");
    const data = response.data.data.split("\n")
    setData(data);
    setIsLoading(false);
  };

  return (
    <>
      <button onClick={handleButtonClick} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch Data"}
      </button>
      {data.length > 0 && (
        <ul>
          {data.map((item) => (
            <li key={item}>
                {item}
                <br />
                Choose scenario
                <p></p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Scenarios;
