import { configuration } from "@/common/Configuration";
import { useCharacter } from "@/repositories/FoundryHooks";
import type { Character, DndAbilities, DndAbility } from "@/repositories/FoundryModels";
import { Stack, Image, Progress, Tabs, Grid, GridItem, Container } from "@chakra-ui/react";

interface ICharacterSheetProps {
    characterId: string
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

function RenderStats(character: Character) {
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

export default function CharacterSheet(props: ICharacterSheetProps) {
    const character = useCharacter(props.characterId);

    if (!character) {
        return 'Character not found';
    }

    return (
        <Container minHeight="100vh">
        <Grid templateRows="auto max-content" minHeight="100vh">
            <GridItem>
Contents
            </GridItem>
            <GridItem>
                <Tabs.Root variant="enclosed" maxW="md" fitted defaultValue={"tab-1"}>
                    <Tabs.List>
                        <Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
                        <Tabs.Trigger value="tab-3">Tab 3</Tabs.Trigger>
                    </Tabs.List>
                </Tabs.Root>
            </GridItem>
        </Grid>
        </Container>);
}