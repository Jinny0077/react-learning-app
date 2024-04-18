import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import DataManagement from "./pages/DataManagement";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/dataManagement" Component={DataManagement} />
          <Route path="/" Component={Home} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
