import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import GlobalStyles from "./utils/GlobalStyles";
import LoginPage from "./pages/LoginPage";
import LoginAndRegisterPage from "./pages/LoginAndRegisterPage";
import HomePage from "./pages/HomePage";
import * as Tooltip from "./design_system/Tooltip";


function App() {
  return (
      <>
        <GlobalStyles />
        <Tooltip.Provider delayDuration={200}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/loginandregister" element={<LoginAndRegisterPage />} />
            <Route path ="/home" element={<HomePage />} />
          </Routes>
        </Tooltip.Provider>
      </>
  );
}

export default App;
