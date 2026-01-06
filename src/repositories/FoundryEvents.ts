import { Signals } from "../common/Signals";
import type { Character } from "./FoundryModels";

export default class FoundryEvents {
    onWorldLoaded: Signals<void>;
    onCharactersUpdated: Signals<Character[]>;
    onCharacterUpdated: Signals<Character>;
    onError: Signals<string>;

    constructor() {
        this.onWorldLoaded = new Signals<void>();
        this.onCharactersUpdated = new Signals<Character[]>();
        this.onCharacterUpdated = new Signals<Character>();
        this.onError = new Signals<string>();
    }
}