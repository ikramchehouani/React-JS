import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const LaunchesOffline = () => {
    const [launchesData, setLaunchesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://api.spacexdata.com/v4/launches"
                );
                setLaunchesData(response.data);
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
            <table className="launches-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Details</th>
                        <th>Ships</th>
                    </tr>
                </thead>
                <tbody>
                    {launchesData.map((launche) => (
                        <tr key={launche.name}>
                            <td>{launche.name}</td>
                            <td>{launche.details}</td>
                            <td>{launche.ships}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LaunchesOffline;