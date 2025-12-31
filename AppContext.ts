import { createContext } from "react";
import FoundryOrchestrator from "./orchestrators/FoundryOrchestrator";

interface IAppContext {
    foundryOrchestrator: FoundryOrchestrator;
}

const foundryOrchestrator = new FoundryOrchestrator();


const appContext = {
  foundryOrchestrator: foundryOrchestrator,
};

export const AppContext = createContext<IAppContext>(appContext);