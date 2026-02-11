import { useContext, useState } from "react";
import { MessageContext, WeaponContext } from "../../../contexts/contexts";
import { WeaponSimpleComponent } from "../../inventory/weapons/WeaponSimpleComponent";
import type { Weapon } from "@dungeons/shared";
import { AdminGiveWeaponComponent } from "./AdminGiveWeaponComponent";
import { AdminEditWeaponComponent } from "./AdminEditWeaponComponent";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";


export const AdminWeaponsOverview: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedWeapon, setSelectedWeapon] = useState<Weapon|null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState<string|undefined>(undefined);
    const weaponsContext = useContext(WeaponContext);

    const onClickWeapon = (weapon: Weapon) => {
        setSelectedWeapon(weapon);
        setIsOpen(true);
    }

    const onClose = () => {
        setIsOpen(false);
        setMessage(undefined);
    }

    const toggleEdit = () => setIsEditing(!isEditing);
    

    return (
        <>
        <h4 className="text-amber-700 font-bold">Weapons</h4>
        <div className="grid grid-cols-3 gap-2 overflow-y-auto scrollbar-hide">
            {
                weaponsContext.value && weaponsContext.value?.map((weapon) => (
                    <WeaponSimpleComponent key={weapon.id} weapon={weapon} onClick={() => onClickWeapon(weapon)} />
                ))
            }
        </div>
        <MessageContext.Provider value={{value: message, set: setMessage}}>
            <Dialog open={isOpen} onClose={onClose}>
                <DialogBackdrop className="fixed inset-0 bg-black/30"/>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-3xl rounded bg-gray-800 pb-2 px-5">
                        <DialogTitle className="text-xl font-bold text-amber-700 pb-2 flex flex-row justify-between w-full items-center">
                            <p>Weapons Manager</p>
                            <button 
                            className="mt-4 px-4 py-2 bg- text-white rounded-lg bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800" 
                            onClick={toggleEdit}>
                                {isEditing ? "Back" : "Edit"}
                            </button>
                        </DialogTitle>
                        {message && <div>
                            <p className="text-green-500 py-4">{message}</p>
                        </div>}
                        {selectedWeapon && !isEditing && <AdminGiveWeaponComponent weapon={selectedWeapon} />}
                        {selectedWeapon && isEditing && <AdminEditWeaponComponent weapon={selectedWeapon}/>}
                    </DialogPanel>
                </div>
            </Dialog>
        </MessageContext.Provider>
        </>
    );
}