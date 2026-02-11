import { loadData, modifyData, modifyDataWithId, modifyFilteredData, saveData } from "./datahandler.js";
import { getGuardianById, hasArmour, hasWeapon, modifyGuardianById } from "./guardians.js";
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
export const armourTypes = [
    "Helmet",
    "Gauntlets",
    "Chest",
    "Legs",
    "ClassItem"
];
/*
--------------------------------------------------
Helper methods
--------------------------------------------------
*/
export const modifyWeapons = async (opperation) => modifyData("weapons", opperation);
export const modifyWeapon = async (filter, opperation) => modifyFilteredData("weapons", filter, opperation);
export const modifyWeaponWithId = async (id, opperation) => modifyDataWithId("weapons", id, opperation);
export const modifyArmours = async (opperation) => modifyData("armor", opperation);
export const modifyArmour = async (filter, opperation) => modifyFilteredData("armor", filter, opperation);
export const modifyArmourWithId = async (id, opperation) => modifyDataWithId("armor", id, opperation);
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
    await modifyWeapons(weapons => {
        weapon.id = getNextId(weapons);
        weapons.push(weapon);
    });
    return weapon;
};
export const editWeapon = async (weapon) => {
    if (weapon.id == null)
        throw new Error("No id found in weapon object!");
    return await modifyWeaponWithId(weapon.id, w => {
        Object.assign(w, weapon);
    });
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
export const getEquippedWeapon = async (guardianId, weaponType) => {
    const guardian = await getGuardianById(guardianId);
    if (!guardian)
        throw new Error("Could not find guardian with id " + guardianId);
    const equippedWeaponId = guardian.inventory[weaponSlotKey[weaponType]];
    if (equippedWeaponId == null)
        return null;
    return await getWeaponById(equippedWeaponId);
};
export const equipWeapon = async (guardianId, weaponId) => {
    const weapon = await getWeaponById(weaponId);
    if (!weapon)
        throw new Error("Something went wrong in equipping weapon: weapon not found");
    if (!(await hasWeapon(guardianId, weaponId)))
        throw new Error("Character does not have weapon");
    const equippedWeapon = await getEquippedWeapon(guardianId, weapon.weaponType);
    await modifyGuardianById(guardianId, async (guardian) => {
        // remove weapon from storage
        const index = guardian.inventory.weaponStorage.findIndex(id => id === weaponId);
        if (index === -1)
            throw new Error("Something went wrong in equipping weapon: weapon not in storage");
        guardian.inventory.weaponStorage.splice(index, 1);
        // equip new weapon
        guardian.inventory[weaponSlotKey[weapon.weaponType]] = weaponId;
        // store previously equipped weapon
        if (equippedWeapon)
            guardian.inventory.weaponStorage.push(equippedWeapon.id);
    });
    return weapon;
};
export const unEquipWeapon = async (guardianId, weaponType) => {
    const weapon = await getEquippedWeapon(guardianId, weaponType);
    if (!weapon)
        return null;
    await modifyGuardianById(guardianId, async (guardian) => {
        guardian.inventory[weaponSlotKey[weapon.weaponType]] = undefined;
        guardian.inventory.weaponStorage.push(weapon.id);
    });
    return weapon;
};
export const linkImageToWeapon = async (weaponId, path) => modifyWeaponWithId(weaponId, weapon => { weapon.image = path; });
/*
--------------------------------------------------
Armour
--------------------------------------------------
*/
export const getArmor = async () => {
    return loadData("armor", []);
};
export const addArmor = async (armour) => {
    await modifyArmours(armours => {
        armour.id = getNextId(armours);
        armours.push(armour);
    });
    return armour;
};
export const editArmour = async (armour) => {
    if (armour.id == null)
        throw new Error("Missing id field of armour object!");
    return await modifyArmourWithId(armour.id, a => {
        Object.assign(a, armour);
    });
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
    if (equippedArmourId == null)
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
export const linkImageToArmour = (weaponId, path) => modifyArmourWithId(weaponId, armour => { armour.image = path; });
