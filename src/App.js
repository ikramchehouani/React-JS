import './App.css'
import Capsules from './Component/capsules/capsules'
import Launches from './Component/launches/launches'
import { TableProvider } from "../src/TableContext";

function App() {
  return (
    <TableProvider>
      <Capsules />
      <Launches />
    </TableProvider>
  )
}

export default App
