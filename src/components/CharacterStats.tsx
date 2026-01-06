import { configuration } from "@/common/Configuration";
import { useCharacter } from "@/repositories/FoundryHooks";
import type { Character, DndAbilities, DndAbility } from "@/repositories/FoundryModels";
import { Stack, Image, Progress, Tabs, Grid, GridItem, Container } from "@chakra-ui/react";

interface CharacterStatsProps {
    characterId?: string
}

function RenderAbility(label: string, ability: DndAbility, proficiencyBonus: number) {
    const modifier = Math.floor((ability.value - 10) / 2);
    const savingThrow = modifier + ability.proficient * proficiencyBonus;

    return (<div>
        {label}: {ability.value} ({modifier}), {savingThrow}
    </div>);
}

function RenderAbilities(character: Character) {
    const proficiencyBonus = character.system.attributes.prof;

    return (<>
        {RenderAbility("Strength", character.system.abilities.str, proficiencyBonus)}
        {RenderAbility("Dexterity", character.system.abilities.dex, proficiencyBonus)}
        {RenderAbility("Intellect", character.system.abilities.int, proficiencyBonus)}
        {RenderAbility("Wisdom", character.system.abilities.wis, proficiencyBonus)}
        {RenderAbility("Charisma", character.system.abilities.cha, proficiencyBonus)}
    </>);
}


export default function CharacterStats(props: CharacterStatsProps) {
    const character = useCharacter(props.characterId);

    if (!character) {
        return 'Character not found';
    }

    return (
        <Stack gap="0">
            <Image
                src={`${configuration.foundryUrl}/${character.img}`}
                alt={character.name}
                bg="bg.subtle"
                objectFit="cover"
                aspectRatio="1"
                borderRadius="l2"
                flexShrink="0"
                height="150px"
                minWidth="150px" />
            <Progress.Root
                defaultValue={character.system.attributes.hp.value}
                max={character.system.attributes.hp.max}
                variant="subtle"
            >
                <Progress.Track>
                    <Progress.Range />
                </Progress.Track>
            </Progress.Root>
            <div>{character.name}</div>
            <div>HP: {character.system.attributes.hp.value} / {character.system.attributes.hp.max}</div>
            {RenderAbilities(character)}
        </Stack>);
}