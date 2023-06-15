import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TableContext } from "../../TableContext.tsx";
import "./style.css";

interface launchesProps {
  name: string;
  details: string;
  ships: [];
}

const Launches = () => {
  const { activeTable, setActiveTable } = useContext(TableContext);

  const setError = (error: string) => {
    error = "404";
    return { error };
  };

  const [launchesData, setLaunchesData] = useState<launchesProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.spacexdata.com/v4/launches");
        setLaunchesData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleLaunchesButtonClick = () => {
    setActiveTable("launches");
  };

  return (
    <div>
      <caption>
        <button onClick={handleLaunchesButtonClick}>
          <h1>Show launches</h1>
        </button>
      </caption>
      {activeTable === "launches" && (
        <table>
          <caption>
            <h1>#Launches</h1>
          </caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Details</th>
              <th>Ships</th>
            </tr>
          </thead>
          <tbody>
            {launchesData.map((launch, index) => (
              <tr key={index}>
                <td>{launch.name}</td>
                <td>{launch.details}</td>
                <td>{launch.ships.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Launches;
