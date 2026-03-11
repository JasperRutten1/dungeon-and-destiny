import axios from "axios";
import type { Item, Weapon, Armour } from "@dungeons/shared";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const getAllItems = async (): Promise<Array<Item>> => {
    console.log("Fetching all items...");
    return (await axios.get(`${API_URL}/items`)).data;
}

const getAllWeapons = async (): Promise<Array<Weapon>> => {
    console.log("Fetching all weapons...");
    return (await axios.get(`${API_URL}/items/weapons`)).data;
}

const getAllArmor = async (): Promise<Array<Armour>> => {
    console.log("Fetching all armor...");
    return (await axios.get(`${API_URL}/items/armour`)).data;
}

const addItem = async (item: Item): Promise<Item> => {
    console.log("Adding item...", item);
    try {
        return (await axios.post(`${API_URL}/items`, item)).data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const addWeapon = async (weapon: Weapon): Promise<Weapon> => {
    console.log("Adding weapon...", weapon);
    try {
        return (await axios.post(`${API_URL}/items/weapons`, weapon)).data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const editWeapon = async (weapon: Weapon): Promise<Weapon> => {
    console.log("Editing weapon...", weapon);
    try {
        return (await axios.post(`${API_URL}/items/weapons/edit`, weapon)).data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const addArmour = async (armour: Armour): Promise<Armour> => {
    console.log("Adding armour...", armour);  
    try {
        return (await axios.post(`${API_URL}/items/armour`, armour)).data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const editArmour = async (armour: Armour): Promise<Armour> => {
    console.log("Editing armour...", armour);  
    try {
        return (await axios.post(`${API_URL}/items/armour/edit`, armour)).data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getGuardianWeaponStorage = async (guardianId: number): Promise<Array<Weapon>> => {
    console.log("Fetching all weapons...");
    return (await axios.get(`${API_URL}/guardians/weapons/${guardianId}`)).data;
}

const getGuardianArmourStorage = async (armourId: number): Promise<Array<Armour>> => {
    console.log("Fetching all armour...");
    return (await axios.get(`${API_URL}/guardians/armour/${armourId}`)).data;
}

const uploadWeaponImage = async (weaponId: number, file: File): Promise<Weapon> => {
    const formData = new FormData();
    formData.append("file", file);

    return (await axios.postForm(`${API_URL}/images/weapons/${weaponId}`, formData)).data;
}

const uploadArmourImage = async (armourId: number, file: File): Promise<Armour> => {
    const formData = new FormData();
    formData.append("file", file);

    return (await axios.postForm(`${API_URL}/images/armour/${armourId}`, formData)).data;
}

const ItemService = {
    getAllItems,
    getAllWeapons,
    getAllArmor,
    addItem,
    addWeapon,
    editWeapon,
    addArmour,
    editArmour,
    getGuardianWeaponStorage,
    getGuardianArmourStorage,
    uploadWeaponImage,
    uploadArmourImage
}

export default ItemService;