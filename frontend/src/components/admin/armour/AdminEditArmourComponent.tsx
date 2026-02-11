import type { Armour } from "@dungeons/shared"
import { useContext } from "react";
import { ArmourContext, MessageContext } from "../../../contexts/contexts";
import ItemService from "../../../services/ItemService";
import { ArmourForm } from "./ArmourForm";

interface AdminEditArmourProps{
    armour: Armour
}

export const AdminEditArmourComponent:React.FC<AdminEditArmourProps> = ({armour}) => {
    const messageContext = useContext(MessageContext);
    const armourContext = useContext(ArmourContext);

    const handleSubmit = (armour: Armour, file: File|undefined) => {
        ItemService.editArmour(armour).then((editedArmour) => {
            console.log("Armour edited:", editedArmour);
            console.log("attempting to upload image...");
            messageContext.set("Edited Armour!");
            if(file) uploadImage(editedArmour, file).then(imageArmour => {
                console.log(`linked image to armour. image location: ${imageArmour.image}`);
                armourContext.update();
            });
            else {
                console.log("no image file found, skipping image upload!");
                armourContext.update();
            }
        }).catch(err => console.log(err));
    }

    const uploadImage = async (armour: Armour, file: File) => {
        if(!armour || armour.id == null) throw new Error("No weapon found to upload image");
        if(!file) throw new Error("No file Selected");
        return await ItemService.uploadArmourImage(armour.id, file);
    }
    
    return (
        <ArmourForm onSubmit={handleSubmit} exsitingArmour={armour} submitButtonText="Edit Armour"/>
    )
}