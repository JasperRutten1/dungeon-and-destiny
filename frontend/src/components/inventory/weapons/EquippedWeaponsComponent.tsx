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

    const generateWeaponSlot = (weapon: Weapon | null | undefined) => (
        <div className="
            flex items-center justify-center
            rounded-lg
            border-2
            bg-gray-800/40
            hover:scale-105
            transition-transform
            min-h-30
        ">
            {
                weapon ? (
                    <WeaponSimpleComponent
                        weapon={weapon}
                        onClick={() => onClickEquipment(weapon)}
                    />
                ) : (
                    <div className="w-full h-full border-2 border-dashed border-gray-600 rounded-lg" />
                )
            }
        </div>
    );

    return (
        <>
            {equippedWeaponContext && (
                <div className="
                    grid grid-cols-1
                    lg:grid-cols-3
                    gap-3
                    p-2
                    min-h-[120px] sm:min-h-[160px]
                ">
                    {generateWeaponSlot(equippedWeaponContext.value?.primary)}
                    {generateWeaponSlot(equippedWeaponContext.value?.secondary)}
                    {generateWeaponSlot(equippedWeaponContext.value?.power)}
                </div>
            )}

            <Dialog open={isOpen} onClose={onClose} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="
                        w-full
                        max-w-lg sm:max-w-2xl lg:max-w-3xl
                        max-h-[90vh]
                        overflow-y-auto
                        rounded-xl
                        bg-gray-900
                        p-4 sm:p-6
                        shadow-2xl
                    ">
                        <DialogTitle className="text-lg sm:text-xl font-bold text-amber-700 mb-4 flex flex-row justify-between">
                            <h3>Equipped Weapon</h3>
                            <button onClick={onClose}>X</button>
                        </DialogTitle>

                        <div className="flex flex-col gap-6">
                            {selectedEquipment && (
                                <WeaponDetailsComponent weapon={selectedEquipment} />
                            )}

                            {unEquipable && (
                                <button
                                    className="
                                        self-stretch sm:self-end
                                        bg-amber-700 hover:bg-amber-600
                                        text-white
                                        py-3 px-4
                                        rounded-lg
                                        font-bold
                                        transition
                                    "
                                    onClick={unEquip}
                                >
                                    Unequip
                                </button>
                            )}
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}