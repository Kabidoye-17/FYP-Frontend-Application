import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import GlobalStyles from "./utils/GlobalStyles";
import LoginPage from "./pages/LoginPage";
import LoginAndRegisterPage from "./pages/LoginAndRegisterPage";
import HomePage from "./pages/HomePage";
import * as Tooltip from "./design_system/Tooltip";
import ViewIssuesPageTable from "./Tables/ViewIssuesPage/ViewIssuesPageTable";
import ViewProjectsPageTable from "./Tables/ViewProjectsPage.tsx/ViewProjectsPageTable";
import SettingsPage from "./pages/SettingsPage";


function App() {
  const getDefaultView = (): string => {
    const defaultView = localStorage.getItem('defaultHomeView');
    return defaultView === 'issues' ? 'issues' : 'projects';
  };

  return (
      <>
        <GlobalStyles />
        <Tooltip.Provider delayDuration={200}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/loginandregister" element={<LoginAndRegisterPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/home" element={<HomePage />}>
              <Route index element={<Navigate to={getDefaultView()} replace />} />
              <Route path="issues" element={<ViewIssuesPageTable />} />
              <Route path="projects" element={<ViewProjectsPageTable />} />
            </Route>
          </Routes>
        </Tooltip.Provider>
      </>
  );
}

export default App;
