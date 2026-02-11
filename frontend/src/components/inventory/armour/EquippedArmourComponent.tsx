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
        {equippedArmourContext && <div className="grid grid-cols-5 gap-2 p-2 min-h-40">
            <div className="h-full">
                {
                    equippedArmourContext.value?.helmet ? 
                    <ArmourSimpleComponent armour={equippedArmourContext.value.helmet} onClick={() => onClickEquipment(equippedArmourContext?.value?.helmet!)}/> : 
                    <div className="h-full w-full border-2"></div>
                }
            </div>
            <div className="h-full">
                {
                    equippedArmourContext.value?.gauntlets ? 
                    <ArmourSimpleComponent armour={equippedArmourContext.value.gauntlets} onClick={() => onClickEquipment(equippedArmourContext?.value?.gauntlets!)}/> : 
                    <div className="h-full w-full border-2"></div>
                }
            </div>
            <div className="h-full">
                {
                    equippedArmourContext.value?.chest ? 
                    <ArmourSimpleComponent armour={equippedArmourContext.value.chest} onClick={() => onClickEquipment(equippedArmourContext?.value?.chest!)}/> : 
                    <div className="h-full w-full border-2"></div>
                }
            </div>
            <div className="h-full">
                {
                    equippedArmourContext.value?.legs ? 
                    <ArmourSimpleComponent armour={equippedArmourContext.value.legs} onClick={() => onClickEquipment(equippedArmourContext?.value?.legs!)}/> : 
                    <div className="h-full w-full border-2"></div>
                }
            </div>
            <div className="h-full">
                {
                    equippedArmourContext.value?.classItem ? 
                    <ArmourSimpleComponent armour={equippedArmourContext.value.classItem} onClick={() => onClickEquipment(equippedArmourContext?.value?.classItem!)}/> : 
                    <div className="h-full w-full border-2"></div>
                }
            </div>
        </div>}
        <Dialog open={isOpen} onClose={onClose}>
            <DialogBackdrop className="fixed inset-0 bg-black/30"/>
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-xl rounded bg-gray-800 p-6">
                    <DialogTitle className="text-xl font-bold text-amber-700 py-4">Equipped Armour</DialogTitle>
                    <div className="flex flex-col gap-4">
                        {selectedEquipment && <ArmourDetailsComponent armour={selectedEquipment} />}
                        {unEquipable && <button className="self-end bg-amber-700 hover:bg-amber-600 text-white p-2 rounded" onClick={unEquip}>Unequip</button>}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
        </>
    )
}