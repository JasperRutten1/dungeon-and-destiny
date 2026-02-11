import { useContext, useState } from "react"
import { WeaponStorageContext, CharacterContext, type WeaponStorageContextType, type CharacterContextType } from "../../../contexts/contexts";
import type { Weapon } from "@dungeons/shared"
import { WeaponSimpleComponent } from "./WeaponSimpleComponent";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { WeaponDetailsComponent } from "./WeaponDetailsComponent";
import guardianService from "../../../services/GuardianService";


export const WeaponStorageComponent: React.FC = () => {
    const [selectedItem, setSetlectedItem] = useState<Weapon|null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string|null>(null);
    const [error, setError] = useState<string|null>(null);
    
    const weaponStorageContext = useContext<WeaponStorageContextType>(WeaponStorageContext);
    const characterContext = useContext<CharacterContextType>(CharacterContext);

    const onClose = () => {
        setIsOpen(false);
        setSetlectedItem(null);
    }

    const equip = () => {
        if(selectedItem == null || selectedItem.id == null) return;
        if(characterContext == null || characterContext.value == null ||characterContext.value.id == null) return;
        guardianService.equipWeapon(selectedItem.id, characterContext.value.id).then(weapon => {
            console.log(`Equipped weapon: ${weapon.name}`);
            setMessage(`Equipped weapon: ${weapon.name}`);
            weaponStorageContext.update();
            onClose();
        }).catch(err => setError(err + ""));
    }

    const onClickItem = (weapon: Weapon) => {
        setSetlectedItem(weapon);
        setIsOpen(true);
    }

    return (
        <>
        {message && <p className="text-green-500">{message}</p>}
        <div className="border-2 rounded-xl">
            <h3 className="text-amber-700 font-bold p-2">Weapon Storage</h3>
            {
                weaponStorageContext.value && weaponStorageContext.value.length === 0 && <div>
                    <p className="text-amber-800">You do not have any items</p>
                </div>
            }
            {
                weaponStorageContext.value && weaponStorageContext.value.length > 0 && <div className="grid grid-cols-3 gap-3 p-3">
                    {
                        weaponStorageContext.value.map(weapon => <WeaponSimpleComponent key={weapon.id} weapon={weapon} onClick={() => onClickItem(weapon)}/>)
                    }
                </div>
            }
        </div>
        <Dialog open={isOpen} onClose={onClose}>
            <DialogBackdrop className="fixed inset-0 bg-black/20"/>
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-5xl rounded bg-gray-800 p-6">
                    <DialogTitle className="text-xl font-bold text-amber-700 pb-4">Inventory</DialogTitle>
                    {error && <p className="text-red-700">{error}</p>}
                    <div className="flex flex-col gap-4">
                        {selectedItem && <WeaponDetailsComponent weapon={selectedItem} />}
                        <button className="self-end bg-amber-700 hover:bg-amber-600 text-white p-2 rounded" onClick={equip}>Equip</button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
        </>
        
    )
}