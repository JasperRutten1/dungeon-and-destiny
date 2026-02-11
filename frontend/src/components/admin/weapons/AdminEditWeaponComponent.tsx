import type { Weapon } from "@dungeons/shared";
import { useContext } from "react";
import { MessageContext, WeaponContext } from "../../../contexts/contexts";
import { WeaponsForm } from "./WeaponsForm";
import ItemService from "../../../services/ItemService";

interface AdminEditWeaponProps {
    weapon: Weapon;
}

export const AdminEditWeaponComponent: React.FC<AdminEditWeaponProps> = ({ weapon}) => {
    const messageContext = useContext(MessageContext);
    const weaponsContext = useContext(WeaponContext);

    const editWeapon = (weapon: Weapon, file: File|null) => {
        if(weapon.id == null) return;
        ItemService.editWeapon(weapon).then(editedWeapon => {
            if(file) uploadImage(editedWeapon, file).then(imageWeapon => {
                console.log(`linked image to weapon. image location: ${imageWeapon.image}`);
                messageContext.set(`linked image to weapon. image location: ${imageWeapon.image}`);
                weaponsContext.update();
            });
            else {
                console.log("no image file found, skipping image upload!");
                weaponsContext.update();
            }
        })
    }

    const uploadImage = async (weapon: Weapon, file: File) => {
        console.log("upload image method:");
        console.log(weapon);
        if(!weapon || weapon.id == null) throw new Error("No weapon found to upload image");
        if(!file) throw new Error("No file Selected");
        return await ItemService.uploadWeaponImage(weapon.id, file);
    }

    return (
        <div className="flex flex-col gap-2">
            <WeaponsForm onSubmit={editWeapon} submitButtonText="Edit Weapon" existingWeapon={weapon} />
        </div>
    )
};