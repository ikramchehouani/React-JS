import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Component/style.css";

const LaunchesOffline = () => {
  const [launchesData, setLaunchesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if ("caches" in window) {
          const cachedResponse = await caches.match(
            "https://api.spacexdata.com/v4/launches"
          );
          if (cachedResponse) {
            const cachedData = await cachedResponse.json();
            setLaunchesData(cachedData);
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
      <h1>Launches</h1>
      <table className="launches-table">
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
    </div>
  );
};

export default LaunchesOffline;
