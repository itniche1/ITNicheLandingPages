import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
