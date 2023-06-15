import './App.css'
import Capsules from './Component/capsules/Capsules.tsx'
import Launches from './Component/launches/launches.tsx'
import { TableProvider } from "../src/TableContext.tsx";

function App() {
  return (
    <TableProvider>
      <Capsules />
      <Launches />
    </TableProvider>
  )
}

export default App
