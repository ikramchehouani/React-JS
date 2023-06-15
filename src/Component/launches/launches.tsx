import React, { useEffect, useState } from "react"
import axios from 'axios'
import './style.css'
interface launchesProps {
    name: string,
    details: string,
    ships: [],
}

const Launches = () => {
  const setError = (error: string) => {
    error = "404"
    return { error }
  }

  const [showTable, setShowTable] = useState(false)
  const [launchesData, setLaunchesData] = useState<launchesProps[]>([]);

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v4/launches")
      .then((response) => {
        setLaunchesData(response.data);
      })

      .catch((error) => {
        setError(error.message);
      })
  }, [])

  const handleButtonClick = () => {
    setShowTable(true)
  }
  return (
  <div>
  
   <caption><button onClick={handleButtonClick}> <h1>Show launches</h1></button> </caption>
      {showTable && ( 
      <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Details</th>
          <th>Ships</th>
        </tr>
      </thead>
      <tbody>
        {launchesData.map((launche, index) => (
          <tr key={index}>
            <td>{launche.name}</td>
            <td>{launche.details}</td>
            <td>{launche.ships.length}</td>
          </tr>
          ))}
      </tbody>
      </table>
    )}
    </div> 
  )
}
export default Launches
