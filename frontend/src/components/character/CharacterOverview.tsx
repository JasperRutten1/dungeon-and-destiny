import { useContext, useState, useEffect } from "react"
import { CharacterContext, TotalArmourStatsContext } from "../../contexts/contexts"
import guardianService from "../../services/GuardianService";
import {type  ArmourStats, type EquippedArmour, type EquippedWeapons } from "@dungeons/shared";
import { EquippedWeaponsComponent } from "../inventory/weapons/EquippedWeaponsComponent";
import { EquippedArmourComponent } from "../inventory/armour/EquippedArmourComponent";
import { EquippedWeaponsContext } from "../../contexts/contexts";
import { EquippedArmourContext } from "../../contexts/contexts";
import { CharacterClassOverview } from "./CharacterClassOverview";


export const CharacterOverview: React.FC = () => {
    const characterContext = useContext(CharacterContext);

    const [equippedArmour, setEquippedArmour] = useState<EquippedArmour | undefined>(undefined);
    const [equippedWeapons, setEquippedWeapons] = useState<EquippedWeapons | undefined>(undefined);
    const [totalArmourStats, setTotalArmourStats] = useState<ArmourStats | undefined>(undefined);

    const fetchEquippedArmour = async () => {
        if (!characterContext?.value?.id) return;
        setEquippedArmour(await guardianService.getEquippedArmour(characterContext.value.id));
    }

    const fetchEquippedWeapons = async () => {
        if (!characterContext?.value?.id) return;
        setEquippedWeapons(await guardianService.getEquippedWeapons(characterContext.value.id));
    }

    const fetchTotalArmourStats = async () => {
        if (!characterContext?.value?.id) return;
        setTotalArmourStats(await guardianService.getTotalArmourStats(characterContext.value.id));
    }

    const updateInventory = async () => {
        fetchEquippedArmour();
        fetchEquippedWeapons();
    }

    useEffect(() => {
        updateInventory();
        fetchTotalArmourStats();
    }, [characterContext.value]);

    return (
        <div className="border-2 rounded-xl p-4 space-y-6 bg-indigo-950/40 backdrop-blur-md shadow-xl">
            
            <TotalArmourStatsContext.Provider value={{ value: totalArmourStats, update: fetchTotalArmourStats }}>
                <CharacterClassOverview />
            </TotalArmourStatsContext.Provider>

            <div>
                <h2 className="text-center text-amber-700 font-bold text-lg sm:text-xl mb-2">
                    -- Weapons --
                </h2>

                <EquippedWeaponsContext.Provider value={{ value: equippedWeapons, update: updateInventory }}>
                    <EquippedWeaponsComponent unEquipable={false} />
                </EquippedWeaponsContext.Provider>
            </div>

            <div>
                <h2 className="text-center text-amber-700 font-bold text-lg sm:text-xl mb-2">
                    -- Armour --
                </h2>

                <EquippedArmourContext.Provider value={{ value: equippedArmour, update: updateInventory }}>
                    <EquippedArmourComponent unEquipable={false} />
                </EquippedArmourContext.Provider>
            </div>

        </div>
    )
}