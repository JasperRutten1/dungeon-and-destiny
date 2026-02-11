import { GuardianContext, type GuardianContextType } from "../../contexts/contexts";
import guardianService from "../../services/GuardianService";
import type { CharacterClass, ElementType, Guardian } from "@dungeons/shared";
import { useContext, useState } from "react";

export const CreateGuardianComponent: React.FC = () => {

    const [name, setName] = useState<string>("");
    const [ghostName, setGhostName] = useState<string>("");
    const [characterClass, setCharacterClass] = useState<CharacterClass>("Titan");
    const [subClass, setSubClass] = useState<ElementType>("Solar");

    const guardiansContext = useContext<GuardianContextType>(GuardianContext);

    const handleSubmit = () => {
        const newGuardian: Guardian = {
            name: name,
            ghost: { name: ghostName },
            inventory: { 
                itemStorage: [], 
                weaponStorage: [], 
                armourStorage: [] 
            },
            characterClass: characterClass,
            subClass: subClass,
            health: 40
        }
        addGuardian(newGuardian);
    }

    const addGuardian = (guardian: Guardian) => {
        guardianService.addGuardian(guardian).then(res => {
            console.log("Guardian added:", res);
            guardiansContext.update();
        });
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <div>   
                <label className="block mb-2 text-white">Guardian Name:</label>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300"
                />
            </div>
            <div>
                <label className="block mb-2 text-white">Ghost Name:</label>
                <input 
                    type="text" 
                    value={ghostName}
                    onChange={(e) => setGhostName(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300"
                />
            </div>
            <div>
                <label className="block mb-2 text-white">Character Class:</label>
                <select 
                    value={characterClass}
                    onChange={(e) => setCharacterClass(e.target.value as CharacterClass)}
                    className="w-full p-2 rounded-lg border border-gray-300"
                >
                    <option value="Titan">Titan</option>
                    <option value="Hunter">Hunter</option>
                    <option value="Warlock">Warlock</option>
                </select>
            </div>
            <div>
                <label className="block mb-2 text-white">Subclass:</label>
                <select 
                    value={subClass}
                    onChange={(e) => setSubClass(e.target.value as ElementType)}
                    className="w-full p-2 rounded-lg border border-gray-300"
                >
                    <option value="Arc">Arc</option>
                    <option value="Solar">Solar</option>
                    <option value="Void">Void</option>
                </select>
            </div>
            <div className="col-span-2">
                <button 
                    onClick={handleSubmit}
                    className="mt-4 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 w-full"
                >
                    Add Guardian
                </button>
            </div>
        </div>
    )
}