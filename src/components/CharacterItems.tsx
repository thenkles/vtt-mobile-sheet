import { configuration } from "@/common/Configuration";
import { useCharacter } from "@/repositories/FoundryHooks";
import { Stack, Image, Accordion } from "@chakra-ui/react";

interface CharacterItemsProps {
    characterId?: string;
    includeTypes?: string;
    excludeTypes?: string;
}


export default function CharacterItems(props: CharacterItemsProps) {
    const character = useCharacter(props.characterId);

    if (!character) {
        return 'Character not found';
    }

    let items = character.items;

    if (props.includeTypes) {
        const includedTypes = props.includeTypes.split(',');

        items = items.filter(item => includedTypes.includes(item.type));
    }

    if (props.excludeTypes) {
        const excludedTypes = props.excludeTypes.split(',');

        items = items.filter(item => !excludedTypes.includes(item.type));
    }

    return (<Stack width="full" maxW="400px">
        {/* <Heading size="md">Product details</Heading> */}
        <Accordion.Root collapsible defaultValue={["info"]}>
            {items.map((item) => {
                return (<Accordion.Item key={item._id} value={item._id}>
                     <Accordion.ItemTrigger>
                        <Image
                            src={`${configuration.foundryUrl}/${item.img}`}
                            alt={item.name}
                            bg="bg.subtle"
                            objectFit="cover"
                            aspectRatio="1"
                            borderRadius="l2"
                            flexShrink="0"
                            width={50} />
                        {item.name}
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody>
                            <div dangerouslySetInnerHTML={{ __html: item.system.description.value }}>

                            </div>
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>);
            })}
        </Accordion.Root>
    </Stack>);

    // return (
    //     <Stack gap="0">
    //         {items.map(item => (
    //             <Stack direction="row">
    //                 <Image
    //                     src={`${configuration.foundryUrl}/${item.img}`}
    //                     alt={item.name}
    //                     bg="bg.subtle"
    //                     objectFit="cover"
    //                     aspectRatio="1"
    //                     borderRadius="l2"
    //                     flexShrink="0"
    //                     width={50} />
    //                 {item.name} ({item.type})
    //             </Stack>
    //         ))}

    //     </Stack>);
}