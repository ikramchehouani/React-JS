import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const CapsulesOffline = () => {
  const [capsulesData, setCapsulesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.spacexdata.com/v4/capsules"
        );
        setCapsulesData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Vous êtes hors ligne</h1>
      <p>Voici les dernières données que nous avons pu récupérer :</p>
      <table className="capsules-table">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Status</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {capsulesData.map((capsule) => (
            <tr key={capsule.serial}>
              <td>{capsule.serial}</td>
              <td>{capsule.status}</td>
              <td>{capsule.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CapsulesOffline;