import { Outlet, useNavigate, useParams } from "react-router-dom";
import CharacterSheet from "../components/CharacterStats";
import { Drawer, Flex, Grid, GridItem, IconButton, Link, Spinner, Tabs } from "@chakra-ui/react";
import { GiCharacter } from "react-icons/gi";
import { useState } from "react";
import CharacterList from "@/components/CharacterList";
import { useCharacter, useIsWorldLoaded } from "@/repositories/FoundryHooks";


function Contents(characterId?: string) {
    if (!characterId) {
        return "Character ID missing";
    }

    return <CharacterSheet characterId={characterId} />;
}

export default function CharacterPage() {
    const { characterId } = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isWorldLoaded = useIsWorldLoaded();
    const character = useCharacter(characterId);

    const navigate = useNavigate();

    const onTabChanged = (tab: string) => {
        navigate(tab);
    }

    const renderName = () => {
        if (!isWorldLoaded) {
            return (<><Spinner /> Loading...</>)
        }

        if (!character) {
            return 'Error';
        }

        return character?.name;
    };

    return (<Drawer.Root open={isMenuOpen} onOpenChange={(e) => setIsMenuOpen(e.open)} placement="start">
        <Drawer.Backdrop />
        <Drawer.Positioner >
            <Drawer.Content>
                <Drawer.Header>
                    <Drawer.Title>Characters</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <CharacterList selectedCharacterId={characterId} />
                </Drawer.Body>
                <Drawer.Footer>
                    {/* <Button variant="outline">Cancel</Button>
                                <Button>Save</Button> */}
                </Drawer.Footer>
                <Drawer.CloseTrigger asChild>
                    {/* <CloseButton size="sm" /> */}
                </Drawer.CloseTrigger>
            </Drawer.Content>
        </Drawer.Positioner>

        <Grid templateRows="max-content auto max-content" height="100vh">
            <GridItem>
                <IconButton variant="ghost" onClick={() => setIsMenuOpen(true)}>
                    <GiCharacter />
                </IconButton>

                {renderName()}
            </GridItem>
            <GridItem>
                <Outlet />
            </GridItem>
            <GridItem>
                <Tabs.Root onValueChange={(e) => onTabChanged(e.value)} variant="enclosed" maxW="md" fitted defaultValue={"tab-1"}>
                    <Tabs.List>
                        <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
                        <Tabs.Trigger value="items">Items</Tabs.Trigger>
                        <Tabs.Trigger value="feats">Feats</Tabs.Trigger>
                    </Tabs.List>
                </Tabs.Root>
            </GridItem>
        </Grid>
    </Drawer.Root>);


}