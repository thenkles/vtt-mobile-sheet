import { configuration } from "@/common/Configuration";
import { useCharacters } from "@/repositories/FoundryHooks";
import { createListCollection, Listbox, Stack } from "@chakra-ui/react";
import { Image, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom";


interface CharacterListProps {
    selectedCharacterId?: string
}

export default function CharacterList(props: CharacterListProps) {
    const characters = useCharacters();
    // const characterCollection = createListCollection({ items: characters });

    return (<Stack>
        {characters.map(character => {
            return (<Link key={character._id} to={`/character/${character._id}/stats`}>
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
                {character.name}
            </Stack>
            </Link>);
        })}
    </Stack>);

    // return (<Listbox.Root collection={characterCollection} value={[props.selectedCharacterId]}>
    //     <Listbox.Content>
    //         {characterCollection.items.map((character) => {
    //             return (
    //                 <Listbox.Item
    //                     item={character}
    //                     key={character._id}
    //                     flexDirection="column"
    //                     alignItems="flex-start"
    //                     gap="2"
    //                     position="relative">
    //                     <Image
    //                         src={`${configuration.foundryUrl}/${character.img}`}
    //                         alt={character.name}
    //                         bg="bg.subtle"
    //                         objectFit="cover"
    //                         aspectRatio="1"
    //                         borderRadius="l2"
    //                         flexShrink="0"
    //                         height="150px"
    //                         minWidth="150px" />
    //                     <Stack gap="0">
    //                         <Text fontSize="sm" fontWeight="medium" whiteSpace="nowrap">
    //                             {character.name}
    //                         </Text>
    //                         {/* <Text fontSize="xs">{album.artist}</Text> */}
    //                     </Stack>
    //                     {/* <Listbox.ItemIndicator
    //           position="absolute"
    //           top="4"
    //           right="4"
    //           layerStyle="fill.solid"
    //           borderWidth="2px"
    //           borderColor="fg.inverted"
    //         /> */}
    //                 </Listbox.Item>
    //             );
    //         })}
    //     </Listbox.Content>
    // </Listbox.Root>)
}