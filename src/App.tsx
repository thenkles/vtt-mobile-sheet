import { Routes, Route } from "react-router-dom";
import './App.css'
import Layout from "./Layout";
import CharacterPage from "./pages/CharacterPage";
import { AppContext } from "./AppContext";
import { useContext, useEffect } from "react";
import { toaster } from "@/components/ui/toaster"


function App() {

  const appContext = useContext(AppContext);
  const orchestrator = appContext.foundryOrchestrator;

  useEffect(() => {
    function onError(error: string) {
      toaster.create({
        description: error,
        type: "error",
      })
    }

    orchestrator.events.onError.subscribe(onError);

    return () => {
      orchestrator.events.onError.unsubscribe(onError);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<span>Home</span>} />
        <Route path="character/:characterId" element={<CharacterPage />} />
        <Route path="*" element={<div>404 error</div>} />
      </Route>
    </Routes>
  )
}

export default App;