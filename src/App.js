import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Answer from "./components/Answer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Form />} />
        <Route path="/answer" element={<Answer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
