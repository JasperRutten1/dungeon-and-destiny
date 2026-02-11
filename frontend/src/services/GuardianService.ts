import axios from "axios";
import type { Armour, ArmourType, EquippedArmour, Guardian, WeaponType, EquippedWeapons, Weapon, ArmourStats } from "@dungeons/shared";

const getGuardianData = async (): Promise<Array<Guardian>> => {
    console.log("Fetching guardian data...");
    return (await axios.get("http://localhost:8080/guardians")).data;
}

const addGuardian = async (guardian: Guardian): Promise<Guardian> => {
    try {
        return (await axios.post("http://localhost:8080/guardians", guardian)).data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const giveWeapon = async (weaponId: number, guardianId: number):Promise<string> => {
    try {
        const data = (await axios.post("http://localhost:8080/guardians/weapons/give", {
            weaponId: weaponId,
            guardianId: guardianId
        })).data;
        console.log(data);
        return data.message;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Fetch all equipped weapons for a guardian
const getEquippedWeapons = async (guardianId: number): Promise<EquippedWeapons> => {
  try {
    const data = (
      await axios.get(`http://localhost:8080/guardians/weapons/equipped/${guardianId}`)
    ).data;
    console.log("fetched equipped weapons:", data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Equip a weapon for a guardian
const equipWeapon = async (weaponId: number, guardianId: number): Promise<Weapon> => {
  try {
    const data = (
      await axios.post("http://localhost:8080/guardians/weapons/equip", {
        weaponId,
        guardianId,
      })
    ).data;
    console.log("equipped weapon:", data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Unequip a weapon from a guardian
const unEquipWeapon = async (guardianId: number, weaponType: WeaponType): Promise<Weapon | null> => {
  try {
    const data = (
      await axios.post("http://localhost:8080/guardians/weapons/unequip", {
        guardianId,
        weaponType,
      })
    ).data;
    console.log("unequipped weapon:", data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const giveArmour = async (armourId: number, guardianId: number):Promise<string> => {
    try {
        const data = (await axios.post("http://localhost:8080/guardians/armour/give", {
            armourId: armourId,
            guardianId: guardianId
        })).data;
        console.log(data);
        return data.message;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getEquippedArmour = async (guardianId: number): Promise<EquippedArmour> => {
    try {
        const data = (await axios.get("http://localhost:8080/guardians/armour/equipped/" + guardianId)).data;
        console.log(`fetched equipped armour: ${data}`);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const equipArmour = async (armourId: number, guardianId: number):Promise<Armour> => {
    try {
        const data = (await axios.post("http://localhost:8080/guardians/armour/equip", {
            armourId: armourId,
            guardianId: guardianId
        })).data;
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const unEquipArmour = async (guardianId: number, armourType: ArmourType):Promise<Armour|null> => {
    try {
        const data = (await axios.post("http://localhost:8080/guardians/armour/unequip", {
            guardianId: guardianId,
            armourType: armourType
        })).data;
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getTotalArmourStats = async (guardianId: number):Promise<ArmourStats> => {
    try {
        return (await axios.get("http://localhost:8080/guardians/armour/stats/" + guardianId)).data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const addHealth = async (guardianId: number, health: number):Promise<Guardian> => {
    try {
        const data = (await axios.post("http://localhost:8080/guardians/health/add", {
            guardianId: guardianId,
            health: health
        })).data;
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const removeHealth = async (guardianId: number, health: number):Promise<Guardian> => {
    try {
        const data = (await axios.post("http://localhost:8080/guardians/health/remove", {
            guardianId: guardianId,
            health: health
        })).data;
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const resetHealth = async (guardianId: number):Promise<Guardian> => {
    try {
        const data = (await axios.post("http://localhost:8080/guardians/health/reset", {
            guardianId: guardianId
        })).data;
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const guardianService = {
    getGuardianData,
    addGuardian,
    giveWeapon,
    getEquippedWeapons,
    equipWeapon,
    unEquipWeapon,
    giveArmour,
    getEquippedArmour,
    equipArmour,
    unEquipArmour,
    getTotalArmourStats,
    addHealth,
    removeHealth,
    resetHealth
}

export default guardianService;