import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TableContext } from "../../TableContext.jsx";
import "./style.css";

const Capsules = () => {
  const { activeTable, setActiveTable } = useContext(TableContext);

  const setError = (error) => {
    error = "404";
    return { error };
  };

  const [capsulesData, setCapsulesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.spacexdata.com/v4/capsules");
        setCapsulesData(response.data);
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
