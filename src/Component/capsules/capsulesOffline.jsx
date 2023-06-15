import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Component/style.css";

const CapsulesOffline = () => {
  const [capsulesData, setCapsulesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if ("caches" in window) {
          const cachedResponse = await caches.match(
            "https://api.spacexdata.com/v4/capsules"
          );
          if (cachedResponse) {
            const cachedData = await cachedResponse.json();
            setCapsulesData(cachedData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>You are offline</h2>
      <p>Here are the latest data we could retrieve:</p>
      <h1>Capsules</h1>
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
