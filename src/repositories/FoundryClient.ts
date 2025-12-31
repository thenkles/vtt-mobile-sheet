import { configuration } from "@/common/Configuration";
import { io, Socket } from "socket.io-client";

export default class FoundryClient {

    sessionId: string | null;
    userId: string | null;
    socket: Socket;
    onCharacterUpdated?: (characterId: string, updates: any) => void;
    onCharactersRetrieved?: (characters: any) => void;
    onError?: (error: string) => void;

    constructor() {
        console.log('Foundry client');

        this.sessionId = this.getSessionId();
        this.userId = null;

        console.log(`Session ID: ${this.sessionId}`);

        const options = {
            'reconnection': false,
            query: { session: this.sessionId }
        };

        if (!this.sessionId) {
            this.onError?.("No session ID");
        }

        this.socket = io(configuration.foundryUrl, options);
    }

    getSessionId() {
        for (let cookie of document.cookie.split('; ')) {
            const [name, value] = cookie.split("=");
            if (name === 'session') {
                return decodeURIComponent(value);
            }
        }

        return null;
    }

    onDocumentModified(change: any) {

        change.result.map((update: any) => this.onCharacterUpdated?.(update._id, update.system));
    };

    onWorldReturned(world: any) {
        this.userId = world.userId;

        if (!this.userId) {
            this.onError?.("No user ID");
            return;
        }

        let characters = world.actors.filter((actor: any) => actor.type === 'character' && actor.ownership[this.userId as string]);

        this.onCharactersRetrieved?.(characters);

        this.socket.on("modifyDocument", this.onDocumentModified.bind(this));
    }

    requestWorld() {
        console.log('requestWorld()');

        if (!this.sessionId) {
            return null;
        }

        this.socket.emit("world", ...[], this.onWorldReturned.bind(this));

    }
}