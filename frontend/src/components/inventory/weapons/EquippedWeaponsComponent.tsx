import { useContext, useState } from "react"
import { CharacterContext, EquippedWeaponsContext } from "../../../contexts/contexts"
import type { Weapon } from "@dungeons/shared";
import guardianService from "../../../services/GuardianService";
import { WeaponSimpleComponent } from "./WeaponSimpleComponent";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { WeaponDetailsComponent } from "./WeaponDetailsComponent";

interface EquippedWeaponsComponentProps {
    unEquipable?: boolean;
}

export const EquippedWeaponsComponent:React.FC<EquippedWeaponsComponentProps> = ({unEquipable = true}) => {
    const equippedWeaponContext = useContext(EquippedWeaponsContext);
    const characterContext = useContext(CharacterContext);

    const [selectedEquipment, setSelectedEquipment] = useState<Weapon|undefined>(undefined);
    const [isOpen, setIsOpen]= useState<boolean>(false);

    const onClickEquipment = (equipment: Weapon) => {
        setSelectedEquipment(equipment);
        setIsOpen(true);
    }

    const onClose = () => {
        setIsOpen(false);
        setSelectedEquipment(undefined);
    }

    const unEquip = () => {
        if(!unEquipable) return;
        if(selectedEquipment == null || selectedEquipment.id == null) return;
        if(characterContext == null || characterContext.value == null ||characterContext.value.id == null) return;
        guardianService.unEquipWeapon(characterContext.value.id, selectedEquipment.weaponType).then(() => {
            console.log("unequipped armour");
            equippedWeaponContext.update();
            onClose();
        }).catch(err => {
            console.log(err);
        });
    }

    const generateWeaponSlot = (weapon: Weapon | null | undefined) => <div className="h-full">
        {
            weapon ? 
            <WeaponSimpleComponent weapon={weapon} onClick={() => onClickEquipment(weapon)}/> : 
            <div className="h-full w-full border-2"></div>
        }
    </div>

    return (
        <>
        {equippedWeaponContext && <div className="grid grid-cols-3 gap-2 p-2 min-h-40">
            {generateWeaponSlot(equippedWeaponContext.value?.primary)}
            {generateWeaponSlot(equippedWeaponContext.value?.secondary)}
            {generateWeaponSlot(equippedWeaponContext.value?.power)}
        </div>}
        <Dialog open={isOpen} onClose={onClose}>
            <DialogBackdrop className="fixed inset-0 bg-black/30"/>
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-3xl rounded bg-gray-800 p-6">
                    <DialogTitle className="text-xl font-bold text-amber-700 py-4">Equipped Weapon</DialogTitle>
                    <div className="flex flex-col gap-4">
                        {selectedEquipment && <WeaponDetailsComponent weapon={selectedEquipment} />}
                        {unEquipable && <button className="self-end bg-amber-700 hover:bg-amber-600 text-white p-2 rounded" onClick={unEquip}>Unequip</button>}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
        </>
    )
}