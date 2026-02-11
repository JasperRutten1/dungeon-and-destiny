import { loadData, saveData } from "./datahandler.js";
import { getItemById, getWeaponById, getArmorById } from "./items.js";
export const getGuardians = async () => {
    return loadData("guardians", []);
};
export const modifyGuardians = async (opperation) => {
    let guardians = await getGuardians();
    await opperation(guardians);
    await saveData(guardians, "guardians");
};
export const modifyGuardian = async (filter, opperation) => {
    await modifyGuardians(async (guardians) => {
        const index = guardians.findIndex(filter);
        if (index === -1) {
            throw new Error(`No Guardian found`);
        }
        opperation(guardians[index]);
    });
};
export const modifyGuardianById = async (id, opperation) => {
    console.log("looking for match with id: " + id);
    await modifyGuardian(g => g.id === id, opperation);
};
export const getGuardianById = async (id) => {
    const guardians = await getGuardians();
    return guardians.find((g) => g.id === id) || null;
};
export const getGuardian = async (id) => {
    const guardians = await getGuardians();
    return guardians.find((g) => g.id === id);
};
export const getLastId = async () => {
    const guardians = await getGuardians();
    if (guardians.length === 0)
        return 1;
    return Math.max(...guardians.map((g) => (g.id ?? 0)));
};
export const addGuardian = async (guardian) => {
    await modifyGuardians(async (guardians) => {
        if (guardian.id === undefined) {
            guardian.id = await getLastId() + 1;
        }
        guardians.push(guardian);
    });
    return guardian;
};
export const hasItem = async (guardianId, itemId) => {
    const guardian = await getGuardianById(guardianId);
    if (!guardian || !guardian.inventory.itemStorage)
        return false;
    return guardian.inventory.itemStorage.some((id) => id === itemId);
};
export const hasWeapon = async (guardianId, weaponId) => {
    const guardian = await getGuardianById(guardianId);
    if (!guardian || !guardian.inventory.weaponStorage)
        return false;
    return guardian.inventory.weaponStorage.some((id) => id === weaponId);
};
export const hasArmour = async (guardianId, armourId) => {
    const guardian = await getGuardianById(guardianId);
    if (!guardian || !guardian.inventory.armourStorage)
        return false;
    return guardian.inventory.armourStorage.some((id) => id === armourId);
};
export const giveItem = async (guardianId, itemId) => {
    if (await hasItem(guardianId, itemId)) {
        throw new Error(`Guardian with ID ${guardianId} already has item with ID ${itemId}`);
    }
    const item = await getItemById(itemId);
    if (!item) {
        throw new Error(`Item with ID ${itemId} not found`);
    }
    await modifyGuardianById(guardianId, guardian => {
        if (!item.id)
            return;
        guardian.inventory.itemStorage.push(item.id);
    });
};
export const giveWeapon = async (guardianId, weaponId) => {
    if (await hasWeapon(guardianId, weaponId)) {
        throw new Error(`Guardian with ID ${guardianId} already has weapon with ID ${weaponId}`);
    }
    const weapon = await getWeaponById(weaponId);
    if (!weapon) {
        throw new Error(`Item with ID ${weaponId} not found`);
    }
    await modifyGuardianById(guardianId, guardian => {
        if (!weapon.id)
            return;
        guardian.inventory.weaponStorage.push(weapon.id);
    });
};
export const giveArmour = async (guardianId, armourId) => {
    if (await hasArmour(guardianId, armourId)) {
        throw new Error(`Guardian with ID ${armourId} already has weapon with ID ${armourId}`);
    }
    const armour = await getArmorById(armourId);
    if (!armour) {
        throw new Error(`Armour with ID ${armourId} not found`);
    }
    await modifyGuardianById(guardianId, guardian => {
        if (!armour.id)
            return;
        guardian.inventory.armourStorage.push(armour.id);
    });
};
