import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TableContext } from "../../TableContext.jsx";
import "../../Component/style.css";

const Launches = () => {
  const { activeTable, setActiveTable } = useContext(TableContext);

  const setError = (error) => {
    error = "404";
    return { error };
  };

  const [launchesData, setLaunchesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if ("caches" in window) {
          const cachedResponse = await caches.match("https://api.spacexdata.com/v4/launches");
          if (cachedResponse) {
            const cachedData = await cachedResponse.json();
            setLaunchesData(cachedData);
          }
        }

        const response = await axios.get("https://api.spacexdata.com/v4/launches");
        setLaunchesData(response.data);
        // Cache the data
        if ("caches" in window) {
          const cache = await caches.open("launches");
          cache.put("https://api.spacexdata.com/v4/launches", new Response(JSON.stringify(response.data)));
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleLaunchesButtonClick = () => {
    setActiveTable(activeTable === "launches" ? "" : "launches");
  };

  return (
    <div>
      <caption>
        <button
          onClick={handleLaunchesButtonClick}
          className={activeTable === "launches" ? "active" : ""}
        >
          <h1>
            {activeTable === "launches" ? "Hide Launches" : "Show Launches"}
          </h1>
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

