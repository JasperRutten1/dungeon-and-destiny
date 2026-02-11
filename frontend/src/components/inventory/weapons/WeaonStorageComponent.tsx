import { useContext, useState } from "react";
import { WeaponStorageContext, CharacterContext, type WeaponStorageContextType, type CharacterContextType } from "../../../contexts/contexts";
import type { Weapon } from "@dungeons/shared";
import { WeaponSimpleComponent } from "./WeaponSimpleComponent";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { WeaponDetailsComponent } from "./WeaponDetailsComponent";
import guardianService from "../../../services/GuardianService";

export const WeaponStorageComponent: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<Weapon | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const weaponStorageContext = useContext<WeaponStorageContextType>(WeaponStorageContext);
    const characterContext = useContext<CharacterContextType>(CharacterContext);

    const onClose = () => {
        setIsOpen(false);
        setSelectedItem(null);
    }

    const equip = () => {
        if (!selectedItem?.id || !characterContext?.value?.id) return;

        guardianService.equipWeapon(selectedItem.id, characterContext.value.id)
            .then(weapon => {
                setMessage(`Equipped weapon: ${weapon.name}`);
                weaponStorageContext.update();
                onClose();
            })
            .catch(err => setError(err + ""));
    }

    const onClickItem = (weapon: Weapon) => {
        setSelectedItem(weapon);
        setIsOpen(true);
    }

    return (
        <>
        {message && <p className="text-green-500 mb-2">{message}</p>}

        <div className="flex flex-col gap-2">
            <h3 className="text-amber-700 font-bold p-2 flex justify-center">-- Weapon Storage --</h3>

            {(!weaponStorageContext.value || weaponStorageContext.value.length === 0) && (
                <p className="text-amber-800 p-2">You do not have any items</p>
            )}

            {weaponStorageContext.value && weaponStorageContext.value.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {weaponStorageContext.value.map(weapon => (
                        <div className="border-2 rounded-xl bg-gray-800/40">
                            <WeaponSimpleComponent 
                                key={weapon.id} 
                                weapon={weapon} 
                                onClick={() => onClickItem(weapon)} 
                            />
                        </div>
                        
                    ))}
                </div>
            )}
        </div>

        {/* Item details modal */}
        <Dialog open={isOpen} onClose={onClose}>
            <DialogBackdrop className="fixed inset-0 bg-black/20"/>
            <div className="fixed inset-0 flex items-center justify-center p-4 overflow-auto">
                <DialogPanel className="w-full max-w-xl sm:max-w-3xl lg:max-w-5xl rounded bg-gray-800 p-6">
                    <DialogTitle className="text-xl sm:text-2xl font-bold text-amber-700 pb-4">Inventory</DialogTitle>

                    {error && <p className="text-red-700 mb-2">{error}</p>}

                    <div className="flex flex-col gap-4">
                        {selectedItem && <WeaponDetailsComponent weapon={selectedItem} />}
                        <button 
                            className="self-end bg-amber-700 hover:bg-amber-600 text-white p-2 rounded"
                            onClick={equip}
                        >
                            Equip
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
        </>
    );
};
