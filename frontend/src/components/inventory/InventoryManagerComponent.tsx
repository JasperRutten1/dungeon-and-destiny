import { useContext, useEffect, useState } from "react"
import { ArmourStorageContext, CharacterContext, EquippedArmourContext, EquippedWeaponsContext, WeaponStorageContext, type CharacterContextType } from "../../contexts/contexts"
import { type Weapon, type Armour, type EquippedArmour, type EquippedWeapons } from "@dungeons/shared"
import ItemService from "../../services/ItemService";
import { WeaponStorageComponent } from "./weapons/WeaonStorageComponent";
import { ArmourStorageComponent } from "./armour/ArmourStorageComponent";
import guardianService from "../../services/GuardianService";
import { EquippedArmourComponent } from "./armour/EquippedArmourComponent";
import { EquippedWeaponsComponent } from "./weapons/EquippedWeaponsComponent";




export const InventoryManagerComponent: React.FC = () => {
    const characterContext = useContext<CharacterContextType>(CharacterContext);

    const [weaponStorage, setWeaponStorage] = useState<Array<Weapon>>([]);
    const [armourStorage, setArmourStorage] = useState<Array<Armour>>([]);
    const [equippedArmour, setEquippedArmour] = useState<EquippedArmour|undefined>(undefined);
    const [equippedWeapons, setEquippedWeapons] = useState<EquippedWeapons|undefined>(undefined);

    const fetchWeaponStorage = async () => {
        if(characterContext == null ||characterContext.value == null || characterContext.value.id == null) return;
        setWeaponStorage(await ItemService.getGuardianWeaponStorage(characterContext.value.id));
    }

    const fetchArmourStorage = async () => {
        if(characterContext == null ||characterContext.value == null || characterContext.value.id == null) return;
        setArmourStorage(await ItemService.getGuardianArmourStorage(characterContext.value.id));
    }

    const fetchEquippedArmour = async () => {
        if(characterContext == null ||characterContext.value == null || characterContext.value.id == null) return;
        setEquippedArmour(await guardianService.getEquippedArmour(characterContext.value.id));
    }

    const fetchEquippedWeapons = async () => {
        if(characterContext == null ||characterContext.value == null || characterContext.value.id == null) return;
        setEquippedWeapons(await guardianService.getEquippedWeapons(characterContext.value.id));
    }

    const updateInventory = async () => {
        fetchWeaponStorage();
        fetchArmourStorage();
        fetchEquippedArmour();
        fetchEquippedWeapons();
    }

    useEffect(() => {
        updateInventory();
    }, [characterContext.value]);

    return (
        <WeaponStorageContext.Provider value={{value: weaponStorage, update: updateInventory}}>
            <ArmourStorageContext.Provider value={{value: armourStorage, update: updateInventory}}>
                
                <div className="border-primary border-2 h-full w-full rounded-lg shadow-lg p-4 overflow-y-auto no-scrollbar">
                    <div className="p-4 text-2xl font-bold text-amber-700">Inventory Manager</div>
                    {
                        !characterContext.value && <div>
                            <p className="text-red-700 font-bold">Select a character to view the inventory</p>
                        </div>
                    }
                    {
                        characterContext.value && (
                            <div className="flex flex-col gap-2">
                                <div className="border-2 flex flex-col rounded-xl">
                                    <EquippedWeaponsContext.Provider value={{value: equippedWeapons, update: updateInventory}}>
                                        <EquippedWeaponsComponent/>
                                    </EquippedWeaponsContext.Provider>
                                    <EquippedArmourContext.Provider value={{value: equippedArmour, update: updateInventory}}>
                                        <EquippedArmourComponent/>
                                    </EquippedArmourContext.Provider>
                                </div>
                                
                                <div className="flex flex-col gap-3">
                                    <WeaponStorageComponent/>
                                    <ArmourStorageComponent/>
                                </div>
                            </div>
                        )
                    }
                    
                </div>
            </ArmourStorageContext.Provider>
        </WeaponStorageContext.Provider>
    )
}