import FoundryEvents from "@/repositories/FoundryEvents";
import { mergeDeep } from "../common/MergeUtils";
import FoundryClient from "../repositories/FoundryClient"
import type { Character } from "@/repositories/FoundryModels";

export default class FoundryOrchestrator {
    client: FoundryClient;
    allCharacters: Character[];
    events: FoundryEvents;

    constructor() {
        this.events = new FoundryEvents();
        this.allCharacters = [];

        this.client = new FoundryClient();

        this.client.onCharactersRetrieved = this.onCharactersRetrieved.bind(this);
        this.client.onCharacterUpdated = this.onCharacterUpdated.bind(this);

        this.client.requestWorld();
    }

    getCharacter(characterId: string): Character | null {

        const foundCharacters = this.allCharacters.filter(character => character._id === characterId);

        if (foundCharacters.length !== 1) {
            return null;
        }

        return foundCharacters[0];
    }

    onCharactersRetrieved(characters: Character[]) {
        console.log(characters);
        this.allCharacters = characters;

        this.allCharacters.forEach(character => this.events.onCharacterUpdated.dispatch(character));
    }

    onCharacterUpdated(id: string, updates: any) {
        console.log(id);
        console.log(updates);

        const updatedCharacter = this.getCharacter(id);

        console.log(updatedCharacter);

        if (!updatedCharacter) {
            console.log("dupa");
            return;
        }

        updatedCharacter.system = mergeDeep(updatedCharacter.system, updates);

        console.log(updatedCharacter);

        this.events.onCharacterUpdated.dispatch(updatedCharacter);
    };

    onError(error: string) {
        this.events.onError.dispatch(error);
    }
}