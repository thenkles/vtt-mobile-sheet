import CharacterItems from "@/components/CharacterItems";
import { useCharacter, useIsWorldLoaded } from "@/repositories/FoundryHooks";
import { Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function CharacterFeatsTab(){
    const { characterId } = useParams();
    const isWorldLoaded = useIsWorldLoaded();
    const character = useCharacter(characterId);

    if (!isWorldLoaded) {
        return (<><Spinner /> Loading...</>)
    }

    if(!character)
    {
        return 'The requested character could not be found';
    }

    return (<CharacterItems characterId={characterId} includeTypes="feat"/>)
}