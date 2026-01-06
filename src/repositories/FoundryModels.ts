export interface AplicationContext {
    AllCharacters: Character[];
}

export interface World {

}

export interface ItemDndSystem {
    description: string;
}

export interface Item {
    _id: string;
    type: string;
    name: string;
    img: string;
    system: ItemDndSystem;
}

export interface DndAbilityBonuses {
    check: string;
    save: string;
}

export interface DndAbility {
    min: number;
    max: number;
    mod: number;
    proficient: number;
    value: number;
    bonuses: DndAbilityBonuses;
}

export interface DndAbilities {
    cha: DndAbility;
    con: DndAbility;
    dex: DndAbility;
    int: DndAbility;
    str: DndAbility;
    wis: DndAbility;
}

export interface DndAttributes {
    ac: {
        calc: string;
        flat: number;
        formula: string;
        label: string;
        type: string;
    };
    attunement: {
        max: number;
    };
    death: {
        failure: number;
        success: number;
    };
    encumbrance:
    {
        max: number | null;
        value: number | null;
    };
    exhaustion: number;
    hd: number;
    hp: {
        bonuses: {
            level: string;
            overall: string;
        };
        min: number;
        max: number;
        temp: number | null;
        tempmax: number | null;
        value: number;
    };
    init: {
        ability: string;
        bonus: string;
        mod: number;
        value: number;
    };
    inspiration: boolean;
    movement: {
        burrow: null
        climb: number | null;
        fly: number | null;
        hover: boolean;
        swim: number | null;
        units: string;
        walk: number;
    };
    prof: number;
    senses: {
        blindsight: number | null;
        darkvision: number | null;
        special: string;
        tremorsense: number | null;
        truesight: number | null;
        units: string;
    };
    spellcasting: string;
    spelldc: number;
}

export interface Dnd5eSystem {
    abilities: DndAbilities;
    attributes: DndAttributes;
}

export interface Character {
    _id: string;
    name: string;
    img: string;
    system: Dnd5eSystem;
    items: Item[];
}