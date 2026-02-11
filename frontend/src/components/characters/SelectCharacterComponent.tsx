import type { Guardian } from "@dungeons/shared";
import { CharacterDetailsComponent } from "../character/CharacterDetailsComponent"
import { useContext } from "react";
import { CharacterContext } from "../../contexts/contexts";

interface SelectCharacterProps {
    character: Guardian; // Define the expected character type properly
}

export const SelectCharacterComponent: React.FC<SelectCharacterProps> = ({ character }) => {
    const charContext = useContext(CharacterContext);

    const onClick = () => {
        charContext.set(character);
        console.log("Selected character:", character);
    }

    return (
        <>
            <div className="cursor-pointer" onClick={onClick}>
                <CharacterDetailsComponent character={character}/>
            </div>
        </>
    )
}