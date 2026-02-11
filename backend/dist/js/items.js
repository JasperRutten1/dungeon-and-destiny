import { loadData, saveData } from "./datahandler.js";
import { getGuardianById, hasArmour, modifyGuardianById } from "./guardians.js";
export const weaponSlotKey = {
    Primary: 'primaryWeapon',
    Secondary: 'secondaryWeapon',
    Power: 'powerWeapon'
};
export const armourSlotKey = {
    Helmet: 'equippedHelmet',
    Gauntlets: 'equippedGauntlets',
    Chest: 'equippedChest',
    Legs: 'equippedLegs',
    ClassItem: 'equippedClassItem',
};
/*
--------------------------------------------------
Helper methods
--------------------------------------------------
*/
const getNextId = (arr) => {
    const maxId = arr.reduce((max, el) => {
        const id = Number(el && el.id);
        return Number.isFinite(id) ? Math.max(max, id) : max;
    }, 0);
    return maxId + 1;
};
const findById = (arr, id) => {
    const num = Number(id);
    if (!Number.isFinite(num))
        return null;
    return arr.find((el) => Number(el && el.id) === num) || null;
};
/*
--------------------------------------------------
Items
--------------------------------------------------
*/
export const getItems = async () => {
    return loadData("items", []);
};
export const addItem = async (item) => {
    const items = await getItems();
    item.id = getNextId(items);
    items.push(item);
    await saveData(items, "items");
};
export const getItemById = async (id) => {
    const items = await getItems();
    return items.find((i) => i.id === id) || null;
};
export const getItemsById = async (ids) => {
    const items = await getItems();
    return items.filter(w => w.id && ids.includes(w.id));
};
export const getGuardianItemStorage = async (guardianId) => {
    const itemStorage = (await getGuardianById(guardianId))?.inventory.itemStorage;
    if (!itemStorage)
        return [];
    else
        return await getItemsById(itemStorage);
};
/*
--------------------------------------------------
Weapons
--------------------------------------------------
*/
export const getWeapons = async () => {
    return loadData("weapons", []);
};
export const addWeapon = async (weapon) => {
    const weapons = await getWeapons();
    weapon.id = getNextId(weapons);
    weapons.push(weapon);
    await saveData(weapons, "weapons");
};
export const getWeaponById = async (id) => {
    const weapons = await getWeapons();
    return weapons.find((w) => w.id === id) || null;
};
export const getWeaponsById = async (ids) => {
    const weapons = await getWeapons();
    return weapons.filter(w => w.id && ids.includes(w.id));
};
export const getGuardianWeaponStorage = async (guardianId) => {
    const weaponStorage = (await getGuardianById(guardianId))?.inventory.weaponStorage;
    if (!weaponStorage)
        return [];
    else
        return await getWeaponsById(weaponStorage);
};
/*
--------------------------------------------------
Armour
--------------------------------------------------
*/
export const getArmor = async () => {
    return loadData("armor", []);
};
export const addArmor = async (armor) => {
    const armors = await getArmor();
    armor.id = getNextId(armors);
    armors.push(armor);
    await saveData(armors, "armor");
};
export const getArmorById = async (id) => {
    const armors = await getArmor();
    return armors.find((a) => a.id === id) || null;
};
export const getArmoursById = async (ids) => {
    const armours = await getArmor();
    return armours.filter(w => w.id && ids.includes(w.id));
};
export const getGuardianArmourStorage = async (guardianId) => {
    const armourStorage = (await getGuardianById(guardianId))?.inventory.armourStorage;
    if (!armourStorage)
        return [];
    else
        return await getArmoursById(armourStorage);
};
export const getEquippedArmour = async (guardianId, armourType) => {
    const guardian = await getGuardianById(guardianId);
    if (!guardian)
        throw new Error("Could not find guardian with id " + guardianId);
    const equippedArmourId = guardian.inventory[armourSlotKey[armourType]];
    if (equippedArmourId == null || equippedArmourId == undefined)
        return null;
    return await getArmorById(equippedArmourId);
};
export const equipArmour = async (guardianId, armourId) => {
    const armour = await getArmorById(armourId);
    if (!armour)
        throw new Error("Somthing went wrong in equipping armour, armour object not found!");
    if (!(await hasArmour(guardianId, armourId)))
        throw new Error("Character does not have item");
    const equippedArmour = await getEquippedArmour(guardianId, armour.armourType);
    await modifyGuardianById(guardianId, async (guardian) => {
        //remove armour from storage
        const index = guardian.inventory.armourStorage.findIndex(id => id === armourId);
        if (index === -1)
            throw new Error("Something when wrong in equiping armour: Character does not have armour in armour storage");
        guardian.inventory.armourStorage.splice(index, 1);
        //set new equipped armour
        guardian.inventory[armourSlotKey[armour.armourType]] = armourId;
        //add old equipped armour to storage
        if (equippedArmour)
            guardian.inventory.armourStorage.push(equippedArmour.id);
    });
    return armour;
};
export const unEquipArmour = async (guardianId, armourType) => {
    const armour = await getEquippedArmour(guardianId, armourType);
    if (!armour)
        return null;
    await modifyGuardianById(guardianId, async (guardian) => {
        guardian.inventory[armourSlotKey[armour.armourType]] = undefined;
        guardian.inventory.armourStorage.push(armour.id);
    });
    return armour;
};
