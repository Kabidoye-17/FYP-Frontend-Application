import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import GlobalStyles from "./utils/GlobalStyles";
import LoginPage from "./pages/LoginPage";
import LoginAndRegisterPage from "./pages/LoginAndRegisterPage";


function App() {
  return (
      <>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/loginandregister" element={<LoginAndRegisterPage />} />
        </Routes>
      </>
  );
}

export default App;
