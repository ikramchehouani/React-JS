import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Style.css";
import { TableContext } from "../../TableContext.tsx";

interface capsuleProps {
  serial: string;
  type: string;
  status: string;
}

const Capsules = () => {
  const { activeTable, setActiveTable } = useContext(TableContext);

  const setError = (error: string) => {
    error = "404";
    return { error };
  };

  const [capsulesData, setCapsulesData] = useState<capsuleProps[]>([]);

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
    setActiveTable("capsules");
  };

  return (
    <>
      <caption>
        <button onClick={handleCapsulesButtonClick}>
          <h1>Show Capsules</h1>
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
    </>
  );
};

export default Capsules;
