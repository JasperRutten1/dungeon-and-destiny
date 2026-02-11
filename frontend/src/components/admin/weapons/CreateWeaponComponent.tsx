import ItemServie from "../../../services/ItemService";
import type { Weapon } from "@dungeons/shared";
import React, { useContext } from "react";
import { WeaponContext } from "../../../contexts/contexts";
import { WeaponsForm } from "./WeaponsForm";

export const CreateWeaponComponent: React.FC = () => {

    const weaponsContext = useContext(WeaponContext);

    const addWeapon = (weapon: Weapon, file: File|null) => {
        ItemServie.addWeapon(weapon).then(res => {
            console.log("Weapon added:", res);
            console.log("attempting to upload image...")
            if(file) uploadImage(res, file).then(imageWeapon => {
                console.log(`linked image to weapon. image location: ${imageWeapon.image}`);
                weaponsContext.update();
            });
            else {
                console.log("no image file found, skipping image upload!");
                weaponsContext.update();
            }
        }).catch(err => console.log(err));
    };

    const uploadImage = async (weapon: Weapon, file: File) => {
        console.log("upload image method:");
        console.log(weapon);
        if(!weapon || weapon.id == null) throw new Error("No weapon found to upload image");
        if(!file) throw new Error("No file Selected");
        return await ItemServie.uploadWeaponImage(weapon.id, file);
    }

    return (
        <WeaponsForm onSubmit={addWeapon} submitButtonText="Create Weapon" />
    );
}