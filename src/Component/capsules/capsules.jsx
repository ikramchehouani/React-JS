import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TableContext } from "../../TableContext";
import "../../Component/style.css";

const Capsules = () => {
  const { activeTable, setActiveTable } = useContext(TableContext);
  const [capsulesData, setCapsulesData] = useState([]);

  const setError = (error) => {
    error = "404";
    return { error };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if ("caches" in window) {
          const cachedResponse = await caches.match("https://api.spacexdata.com/v4/capsules");
          if (cachedResponse) {
            const cachedData = await cachedResponse.json();
            setCapsulesData(cachedData);
          }
        }

        const response = await axios.get("https://api.spacexdata.com/v4/capsules");
        setCapsulesData(response.data);
        // Cache the data
        if ("caches" in window) {
          const cache = await caches.open("capsules");
          cache.put("https://api.spacexdata.com/v4/capsules", new Response(JSON.stringify(response.data)));
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleCapsulesButtonClick = () => {
    setActiveTable(activeTable === "capsules" ? "" : "capsules");
  };

  return (
    <div>
      <caption>
        <button
          onClick={handleCapsulesButtonClick}
          className={activeTable === "capsules" ? "active" : ""}
        >
          <h1>{activeTable === "capsules" ? "Hide Capsules" : "Show Capsules"}</h1>
        </button>
      </caption>
      {activeTable === "capsules" && (
        <table>
          <caption>
            <h1>#Capsules</h1>
          </caption>
          <thead>
            <tr>
              <th>Serial</th>
              <th>Status</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {capsulesData.map((capsule, index) => (
              <tr key={index}>
                <td>{capsule.serial}</td>
                <td>{capsule.status}</td>
                <td>{capsule.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Capsules;
