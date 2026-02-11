import { createContext } from "react";

import { type ArmourStats, type Armour, type EquippedArmour, type EquippedWeapons, type Guardian, type Item, type Weapon } from "@dungeons/shared";


export interface SimpleContextType<T> {
    value: T|undefined;
    update: () => void;
}

export interface SetterContextType<T>{
    value: T|undefined;
    set: (newValue: T) => void
}

export type GuardianContextType = SimpleContextType<Array<Guardian>>;
export const GuardianContext = createContext<GuardianContextType>(
    {
        value: undefined,
        update: () => {}
    }
);

export type MessageContextType = SetterContextType<string|undefined>;
export const MessageContext = createContext<MessageContextType>({
    value: undefined,
    set: () => {}
});

export type EditingContextType = SetterContextType<boolean>;
export const EditingContext = createContext<EditingContextType>({
    value: undefined,
    set: () => {}
});


/* Character Context */

export type CharacterContextType = SetterContextType<Guardian>;

export const CharacterContext = createContext<CharacterContextType>({
    value: undefined,
    set: () => {}
});

/* Item Context */

export type ItemContextType = SimpleContextType<Array<Item>>;

export const ItemContext = createContext<ItemContextType>(
    {
        value: undefined,
        update: () => {}
    }
);

export type WeaponContextType = SimpleContextType<Array<Weapon>>;

export const WeaponContext = createContext<WeaponContextType>(
    {
        value: undefined,
        update: () => {}
    }
);

export type WeaponStorageContextType = SimpleContextType<Array<Weapon>>;

export const WeaponStorageContext = createContext<WeaponStorageContextType>(
    {
        value: undefined,
        update: () => {}
    }
)

export type EquippedWeaponsContextType = SimpleContextType<EquippedWeapons>;

export const EquippedWeaponsContext = createContext<EquippedWeaponsContextType>({
        value: undefined,
        update: () => {}
    }
)

export type ArmourContextType = SimpleContextType<Array<Armour>>;

export const ArmourContext = createContext<ArmourContextType>(
    {
        value: undefined,
        update: () => {}
    }
);

export type ArmourStorageContextType = SimpleContextType<Array<Armour>>;

export const ArmourStorageContext = createContext<ArmourStorageContextType>(
    {
        value: undefined,
        update: () => {}
    }
)

export type EquippedArmourContextType = SimpleContextType<EquippedArmour>;

export const EquippedArmourContext = createContext<EquippedArmourContextType>(
    {
        value: undefined,
        update: () => {}
    }
)

export const TotalArmourStatsContext = createContext<SimpleContextType<ArmourStats>>({
    value: undefined,
    update: () => {}
})



