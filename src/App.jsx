import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import LoginComponent from "./components/loginComponent";
import CollegeSearch from "./components/SearchCollegeComponent";
import CollegeStudentDetail from "./components/CollegeStudentDetail";

function App() {
  const [selectedCollege, setSelectedCollege] = useState(null);

  const handleCollegeSelection = (selectedCollege) => {
    setSelectedCollege(selectedCollege);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route
          path="/app"
          element={
            <CollegeSearch onCollegeSelection={handleCollegeSelection} />
          }
        />
        <Route
          path="/app/:collegeId"
          element={<CollegeStudentDetail selectedCollege={selectedCollege} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
