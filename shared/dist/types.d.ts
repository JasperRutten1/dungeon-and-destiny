export interface ImageLink {
    image?: string;
}
export interface ImageResource {
    id?: number;
    name: string;
    url: string;
    type: ImageResourceType;
}
export type ImageResourceType = 'item' | 'weapon' | 'armour' | 'ghost' | 'ship' | 'vehicle';
export interface Guardian {
    id?: number;
    name: string;
    ghost: Ghost;
    inventory: SimpleInventory;
    characterClass: CharacterClass;
    subClass: ElementType;
    health: number;
    overshield: number;
}
export interface Ghost {
    name: string;
}
export interface Ability {
    name: string;
    description: string;
    cooldown?: number;
}
export interface SimpleInventory {
    primaryWeapon?: number;
    secondaryWeapon?: number;
    powerWeapon?: number;
    equippedHelmet?: number;
    equippedGauntlets?: number;
    equippedChest?: number;
    equippedLegs?: number;
    equippedClassItem?: number;
    itemStorage: Array<number>;
    weaponStorage: Array<number>;
    armourStorage: Array<number>;
}
export interface EquippedWeapons {
    primary: Weapon | null;
    secondary: Weapon | null;
    power: Weapon | null;
}
export interface EquippedArmour {
    helmet: Armour | null;
    gauntlets: Armour | null;
    chest: Armour | null;
    legs: Armour | null;
    classItem: Armour | null;
}
export type WeaponSlotKey = 'primaryWeapon' | 'secondaryWeapon' | 'powerWeapon';
export type ArmourSlotKey = 'equippedHelmet' | 'equippedGauntlets' | 'equippedChest' | 'equippedLegs' | 'equippedClassItem';
export interface Item {
    id?: number;
    name: string;
    description: string;
    rarity: ItemRarity;
}
export interface ItemWithImage extends Item, ImageLink {
    ImageResourceId?: number;
}
export interface Weapon extends ItemWithImage {
    stats: WeaponStats;
    weaponType: WeaponType;
    weaponCategory: WeaponCategory;
    elementType: ElementType;
}
export interface WeaponStats {
    accuracy: number;
    range: number;
    magazineSize: number;
    damage: string;
    blastRadius?: number;
}
export interface Armour extends ItemWithImage {
    stats: ArmourStats;
    classType: CharacterClass;
    armourType: ArmourType;
}
export interface ArmourStats {
    resilience: number;
    agility: number;
    intelligence: number;
    weaponHandling: number;
    abilityPower: number;
    lightLevel: number;
}
export type CharacterClass = 'Titan' | 'Hunter' | 'Warlock';
export type ElementType = 'Kinetic' | 'Arc' | 'Solar' | 'Void';
export type WeaponType = 'Primary' | 'Secondary' | 'Power';
export type WeaponCategory = 'AutoRifle' | 'HandCannon' | 'PulseRifle' | 'ScoutRifle' | 'SniperRifle' | 'Shotgun' | 'FusionRifle' | 'RocketLauncher' | 'Sword' | 'SubmachineGun' | 'Sidearm' | 'GrenadeLauncher' | 'Bow' | 'MachineGun' | 'LinearFusionRifle' | 'TraceRifle';
export type ArmourType = 'Helmet' | 'Gauntlets' | 'Chest' | 'Legs' | 'ClassItem';
export type ItemRarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Exotic';
//# sourceMappingURL=types.d.ts.map