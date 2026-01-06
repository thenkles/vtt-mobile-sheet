import { AppContext } from "@/AppContext";
import { useContext, useEffect, useState } from "react";
import type { Character } from "./FoundryModels";


export function useIsWorldLoaded() {
    const appContext = useContext(AppContext);
    const orchestrator = appContext.foundryOrchestrator;
    const isAlreadyLoaded = orchestrator.isWorldLoaded;

    const [isWorldLoaded, setIsWorldLoaded] = useState(isAlreadyLoaded);

    useEffect(() => {
        function onWorldLoaded() {
            setIsWorldLoaded(true);
        }

        orchestrator.events.onWorldLoaded.subscribe(onWorldLoaded);

        return () => {
            orchestrator.events.onWorldLoaded.unsubscribe(onWorldLoaded);
        };
    }, []);

    return isWorldLoaded;
}

export function useCharacter(characterId?: string) {
    const appContext = useContext(AppContext);
    const orchestrator = appContext.foundryOrchestrator;
    const initialCharacter = orchestrator.getCharacter(characterId) ?? null;

    const [character, setCharacter] = useState<Character | null>(initialCharacter);

    useEffect(() => {
        function onCharacterUpdated(updatedCharacter: Character) {
            if (updatedCharacter._id == characterId) {
                setCharacter({ ...updatedCharacter });
            }
        }

        orchestrator.events.onCharacterUpdated.subscribe(onCharacterUpdated);

        return () => {
            orchestrator.events.onCharacterUpdated.unsubscribe(onCharacterUpdated);
        };
    }, []);

    return character;
}

export function useCharacters() {
    const appContext = useContext(AppContext);
    const orchestrator = appContext.foundryOrchestrator;

    const [characters, setCharacters] = useState<Character[]>(orchestrator.allCharacters);

    useEffect(() => {
        function onCharactersUpdated(allCharacters: Character[]) {
            setCharacters(allCharacters);
        }

        orchestrator.events.onCharactersUpdated.subscribe(onCharactersUpdated);

        return () => {
            orchestrator.events.onCharactersUpdated.unsubscribe(onCharactersUpdated);
        };
    }, []);

    return characters;
}