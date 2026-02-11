import { useContext, useState } from "react"
import { EquippedArmourContext, CharacterContext } from "../../../contexts/contexts"
import { ArmourSimpleComponent } from "./ArmourSimpleComponent";
import { type Armour } from "@dungeons/shared";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ArmourDetailsComponent } from "./ArmourDetailsComponent";
import guardianService from "../../../services/GuardianService";

interface EquippedArmourComponentProps {
    unEquipable?: boolean
}

export const EquippedArmourComponent: React.FC<EquippedArmourComponentProps> = ({unEquipable = true}) => {
    const equippedArmourContext = useContext(EquippedArmourContext);
    const characterContext = useContext(CharacterContext);

    const [selectedEquipment, setSelectedEquipment] = useState<Armour|undefined>(undefined);
    const [isOpen, setIsOpen]= useState<boolean>(false);

    const onClickEquipment = (equipment: Armour) => {
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
        guardianService.unEquipArmour(characterContext.value.id, selectedEquipment.armourType).then(() => {
            console.log("unequipped armour");
            equippedArmourContext.update();
            onClose();
        }).catch(err => {
            console.log(err);
        });
    }

    return (
    <>
        {equippedArmourContext && (
            <div className="
                grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5
                gap-3
                p-2
                min-h-[140px]
            ">
                {[
                    equippedArmourContext.value?.helmet,
                    equippedArmourContext.value?.gauntlets,
                    equippedArmourContext.value?.chest,
                    equippedArmourContext.value?.legs,
                    equippedArmourContext.value?.classItem,
                ].map((piece, index) => (
                    <div
                        key={index}
                        className="
                            rounded-lg
                            border-2
                            bg-gray-800/40
                            flex items-center justify-center
                            hover:scale-105
                            transition
                        "
                    >
                        {piece ? (
                            <ArmourSimpleComponent
                                armour={piece}
                                onClick={() => onClickEquipment(piece)}
                            />
                        ) : (
                            <div className="w-full min-h-40 h-full border-2 border-dashed border-gray-600 rounded-lg" />
                        )}
                    </div>
                ))}
            </div>
        )}

        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="
                    w-full
                    max-w-lg sm:max-w-2xl
                    max-h-[90vh]
                    overflow-y-auto
                    rounded-xl
                    bg-gray-900
                    p-4 sm:p-6
                    shadow-2xl
                ">
                    <DialogTitle className="text-lg sm:text-xl font-bold text-amber-700 mb-4 flex flex-row justify-between">
                            <h3>Equipped Armour</h3>
                            <button onClick={onClose}>X</button>
                        </DialogTitle>

                    <div className="flex flex-col gap-6">
                        {selectedEquipment && (
                            <ArmourDetailsComponent armour={selectedEquipment} />
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