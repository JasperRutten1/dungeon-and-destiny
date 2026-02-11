import { useContext, useState } from "react";
import { ArmourContext } from "../../../contexts/contexts";
import type { Armour } from "@dungeons/shared";
import { ArmourSimpleComponent } from "../../inventory/armour/ArmourSimpleComponent";
import { AdminGiveArmourComponent } from "./AdminGiveArmourComponent";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { AdminEditArmourComponent } from "./AdminEditArmourComponent";

export const AdminArmourOverview: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedArmour, setSelectedArmour] = useState<Armour|null>(null);
    const [message, setMessage] = useState<string|undefined>(undefined);
    const [isEditing, setIsEditing] = useState(false);
    const armourContext = useContext(ArmourContext);

    const onClickArmour = (armour: Armour) => {
        setSelectedArmour(armour);
        setIsOpen(true);
    }

    const onClose = () => {
        setIsOpen(false);
        setMessage(undefined);
    }

    const toggleEdit = () => setIsEditing(!isEditing);

    return (
        <>
        <h4 className="text-amber-700 font-bold">Armour</h4>
        <div className="grid grid-cols-5 gap-2 overflow-y-auto scrollbar-hide">
            {
                armourContext.value && armourContext.value?.map((armour) => (
                    <ArmourSimpleComponent key={armour.id} armour={armour} onClick={() => onClickArmour(armour)} />
                ))
            }
        </div>
        <Dialog open={isOpen} onClose={onClose}>
            <DialogBackdrop className="fixed inset-0 bg-black/30"/>
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-5xl rounded bg-gray-800 p-6">
                    <DialogTitle className="text-xl font-bold text-amber-700 pb-2 flex flex-row justify-between w-full items-center">
                                <p>Armour Manager</p>
                                <button 
                                className="mt-4 px-4 py-2 bg- text-white rounded-lg bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800" 
                                onClick={toggleEdit}>
                                    {isEditing ? "Back" : "Edit"}
                                </button>
                            </DialogTitle>
                    {message && <div>
                        <p className="text-green-500 py-4">{message}</p>
                    </div>}
                    {selectedArmour && !isEditing && <AdminGiveArmourComponent armour={selectedArmour}/>}
                    {selectedArmour && isEditing && <AdminEditArmourComponent armour={selectedArmour}/>}
                </DialogPanel>
            </div>
        </Dialog>
        </>
    );
}