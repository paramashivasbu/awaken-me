import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import MeditationAlarmApp from "./pages/MeditationAlarmApp";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        <Routes>
          <Route path="/" element={<MeditationAlarmApp />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </div>
    </Suspense>
  );
}

export default App;
