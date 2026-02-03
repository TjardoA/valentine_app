import { BrowserRouter, Routes, Route } from "react-router-dom";
import SenderPage from "./pages/SenderPage.jsx";
import ValentinePage from "./pages/ValentinePage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SenderPage />} />
        <Route path="/valentine" element={<ValentinePage />} />
      </Routes>
    </BrowserRouter>
  );
}
