
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RegisterUser from "./pages/registerUser";
import LoginUser from "./pages/loginUser";



function App() {
  

  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>

            {/* <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} /> */}
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<LoginUser />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
