import { useContext, useState } from "react"
import { CharacterContext, ArmourStorageContext } from "../../../contexts/contexts";
import type { Armour } from "@dungeons/shared"
import { ArmourSimpleComponent } from "./ArmourSimpleComponent";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ArmourDetailsComponent } from "./ArmourDetailsComponent";
import guardianService from "../../../services/GuardianService";


export const ArmourStorageComponent: React.FC = () => {
    const [selectedItem, setSetlectedItem] = useState<Armour|null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string|null>(null);
    const [error, setError] = useState<string|null>(null);
    
    const armourStorageContext = useContext(ArmourStorageContext);
    const characterContext = useContext(CharacterContext);

    const onClickItem = (armour: Armour) => {
        setSetlectedItem(armour);
        setIsOpen(true);
    }

    const onClose = () => {
        setIsOpen(false);
        setSetlectedItem(null);
    }

    const equip = () => {
        if(selectedItem == null || selectedItem.id == null) return;
        if(characterContext == null || characterContext.value == null ||characterContext.value.id == null) return;
        guardianService.equipArmour(selectedItem.id, characterContext.value.id).then(armour => {
            setMessage(`equipped armour ${armour.name} for ${armour.armourType}`);
            armourStorageContext.update();
            onClose();
        }).catch(err => setError(err + ""));
    }

    return (
        <>
        {message && <p className="text-green-500">{message}</p>}
        <div className="border-2 rounded-xl">
            <h3 className="text-amber-700 font-bold p-2">Armour Storage</h3>
            {
                armourStorageContext.value && armourStorageContext.value.length === 0 && <div>
                    <p className="text-amber-800">You do not have any items</p>
                </div>
            }
            {
                armourStorageContext.value && armourStorageContext.value.length > 0 && <div className="grid grid-cols-5 gap-3 p-3">
                    {
                        armourStorageContext.value.map(armour => <ArmourSimpleComponent key={armour.id} armour={armour} onClick={() => onClickItem(armour)}/>)
                    }
                </div>
            }
        </div>
        <Dialog open={isOpen} onClose={onClose}>
            <DialogBackdrop className="fixed inset-0 bg-black/30"/>
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-xl rounded bg-gray-800 p-6">
                    <DialogTitle className="text-xl font-bold text-amber-700 py-4">Inventory</DialogTitle>
                    {error && <p className="text-red-700">{error}</p>}
                    <div className="flex flex-col gap-4">
                        {selectedItem && <ArmourDetailsComponent armour={selectedItem} />}
                        <button className="self-end bg-amber-700 hover:bg-amber-600 text-white p-2 rounded" onClick={equip}>Equip</button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
        </>
        
    )
}