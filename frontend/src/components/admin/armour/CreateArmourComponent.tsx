import { useContext } from "react"
import ItemService from "../../../services/ItemService"
import type { Armour } from "@dungeons/shared"
import { ArmourContext, type ArmourContextType } from "../../../contexts/contexts";
import { ArmourForm } from "./ArmourForm";

export const CreateArmourComponent: React.FC = () => {
    const armourContext = useContext<ArmourContextType>(ArmourContext);

    const handleSubmit = (armour: Armour, file: File|undefined) => {
        ItemService.addArmour(armour).then((createdArmour) => {
            console.log("Armour added:", createdArmour);
            console.log("attempting to upload image...")
            if(file) uploadImage(createdArmour, file).then(imageArmour => {
                console.log(`linked image to armour. image location: ${imageArmour.image}`);
                armourContext.update();
            });
            else {
                console.log("no image file found, skipping image upload!");
                armourContext.update();
            }
        })
    }

    const uploadImage = async (armour: Armour, file: File) => {
        if(!armour || armour.id == null) throw new Error("No weapon found to upload image");
        if(!file) throw new Error("No file Selected");
        return await ItemService.uploadArmourImage(armour.id, file);
    }
    
    return (
        <ArmourForm onSubmit={handleSubmit} submitButtonText="Create Armour"/>
    )
}