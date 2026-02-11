import { useContext, useEffect, useState } from "react";
import {
  ArmourStorageContext,
  CharacterContext,
  EquippedArmourContext,
  EquippedWeaponsContext,
  WeaponStorageContext,
  type CharacterContextType
} from "../../contexts/contexts";
import { type Weapon, type Armour, type EquippedArmour, type EquippedWeapons } from "@dungeons/shared";
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
  const [equippedArmour, setEquippedArmour] = useState<EquippedArmour | undefined>(undefined);
  const [equippedWeapons, setEquippedWeapons] = useState<EquippedWeapons | undefined>(undefined);

  const fetchWeaponStorage = async () => {
    if (!characterContext?.value?.id) return;
    setWeaponStorage(await ItemService.getGuardianWeaponStorage(characterContext.value.id));
  };

  const fetchArmourStorage = async () => {
    if (!characterContext?.value?.id) return;
    setArmourStorage(await ItemService.getGuardianArmourStorage(characterContext.value.id));
  };

  const fetchEquippedArmour = async () => {
    if (!characterContext?.value?.id) return;
    setEquippedArmour(await guardianService.getEquippedArmour(characterContext.value.id));
  };

  const fetchEquippedWeapons = async () => {
    if (!characterContext?.value?.id) return;
    setEquippedWeapons(await guardianService.getEquippedWeapons(characterContext.value.id));
  };

  const updateInventory = async () => {
    fetchWeaponStorage();
    fetchArmourStorage();
    fetchEquippedArmour();
    fetchEquippedWeapons();
  };

  useEffect(() => {
    updateInventory();
  }, [characterContext.value]);

  return (
    <WeaponStorageContext.Provider value={{ value: weaponStorage, update: updateInventory }}>
      <ArmourStorageContext.Provider value={{ value: armourStorage, update: updateInventory }}>
        <div className="border-primary border-2 rounded-lg shadow-lg p-4 h-full w-full flex flex-col overflow-y-auto no-scrollbar">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-700 mb-4">Inventory Manager</h2>

          {!characterContext.value ? (
            <p className="text-red-700 font-bold text-lg">Select a character to view the inventory</p>
          ) : (
            <div className="flex flex-col gap-4">

              {/* Equipped items */}
              <div className="flex flex-col gap-4">
                <EquippedWeaponsContext.Provider value={{ value: equippedWeapons, update: updateInventory }}>
                  <div className="flex-1">
                    <h4 className="flex justify-center text-amber-700 font-bold">-- Equipped Weapons --</h4>
                    <EquippedWeaponsComponent />
                  </div>
                </EquippedWeaponsContext.Provider>

                <EquippedArmourContext.Provider value={{ value: equippedArmour, update: updateInventory }}>
                  <div className="flex-1">
                    <h4 className="flex justify-center text-amber-700 font-bold">-- Equipped Armour --</h4>
                    <EquippedArmourComponent />
                  </div>
                </EquippedArmourContext.Provider>
              </div>

              {/* Storage sections */}
              <div className="flex flex-col gap-4">
                <WeaponStorageComponent/>
                <ArmourStorageComponent/>
              </div>
            </div>
          )}
        </div>
      </ArmourStorageContext.Provider>
    </WeaponStorageContext.Provider>
  );
};
