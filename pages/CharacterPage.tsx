import { useParams } from "react-router-dom";
import CharacterSheet from "../components/CharacterSheet";
import { Drawer, Flex, Grid, GridItem, IconButton, Tabs } from "@chakra-ui/react";
import { GiCharacter } from "react-icons/gi";
import { useState } from "react";
import CharacterList from "@/components/CharacterList";


function Contents(characterId?: string) {
    if (!characterId) {
        return "Character ID missing";
    }

    return <CharacterSheet characterId={characterId} />;
}

export default function CharacterPage() {
    const { characterId } = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        {/* <header>
            <Flex as="nav" align="center" justify="space-between" wrap="wrap"
                gap={{ base: 8, lg: 16 }} px={{ base: 6, lg: 12 }} py={3}
                maxW={{ base: "full", xl: "1440px" }} mx="auto" position="static">
                <IconButton variant="ghost" onClick={() => setIsMenuOpen(true)}>
                    <GiCharacter />
                </IconButton>
            </Flex>


        </header>
        <main className="container">
            {Contents(characterId)}
        </main> */}
        <Grid templateRows="max-content auto max-content" height="100vh">
            <GridItem>
            <IconButton variant="ghost" onClick={() => setIsMenuOpen(true)}>
                    <GiCharacter />
                </IconButton>
            </GridItem>
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
    </Drawer.Root>);


}