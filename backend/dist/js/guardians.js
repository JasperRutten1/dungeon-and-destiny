import { loadData, modifyData, modifyDataWithId, modifyFilteredData } from "./datahandler.js";
import { getItemById, getWeaponById, getArmorById } from "./items.js";
import { getEquippedArmour } from "./items.js";
import { armourTypes } from "./items.js";
const GUARDIAN_DEFAULT_HP = 40;
export const getGuardians = async () => {
    return loadData("guardians", []);
};
export const modifyGuardians = async (opperation) => modifyData("guardians", opperation);
export const modifyGuardian = async (filter, opperation) => modifyFilteredData("guardians", filter, opperation);
export const modifyGuardianById = async (id, opperation) => modifyDataWithId("guardians", id, opperation);
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
    if (await hasWeapon(guardianId, weaponId))
        return;
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
    if (await hasArmour(guardianId, armourId))
        return;
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
export const getGuardianTotalArmourStats = async (guardianId) => {
    const armours = await Promise.all(armourTypes.map(type => getEquippedArmour(guardianId, type)));
    const base = {
        resilience: 0,
        agility: 0,
        intelligence: 0,
        weaponHandling: 0,
        abilityPower: 0,
        lightLevel: 0
    };
    for (const armour of armours) {
        if (!armour)
            continue;
        for (const key in base) {
            const statKey = key;
            base[statKey] += armour.stats[statKey];
        }
    }
    return base;
};
export const addHealth = async (guardianId, health) => {
    return await modifyGuardianById(guardianId, async (guardian) => {
        const stas = await getGuardianTotalArmourStats(guardian.id);
        guardian.health = Math.min(guardian.health + health, stas.resilience + GUARDIAN_DEFAULT_HP);
    });
};
export const removeHealth = async (guardianId, health) => {
    return await modifyGuardianById(guardianId, async (guardian) => {
        guardian.health = Math.max(guardian.health - health, 0);
    });
};
export const resetHealth = async (guardianId) => {
    return await modifyGuardianById(guardianId, async (guardian) => {
        guardian.health = (await getGuardianTotalArmourStats(guardian.id)).resilience + GUARDIAN_DEFAULT_HP;
    });
};
