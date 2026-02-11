import type { Armour } from "@dungeons/shared"
import { useState } from "react";
import type { ItemRarity, CharacterClass, ArmourType } from "@dungeons/shared";

interface ArmourFormProps{
    onSubmit: (armour: Armour, file: File| undefined) => void;
    submitButtonText: string;
    exsitingArmour?: Armour | undefined;
}

export const ArmourForm:React.FC<ArmourFormProps> = ({onSubmit, submitButtonText, exsitingArmour}) => {
    const [id] = useState<number|undefined>(exsitingArmour?.id || undefined);
    const [name, setName] = useState<string>(exsitingArmour?.name || "");
    const [description, setDescription] = useState<string>(exsitingArmour?.description || "");
    const [rarity, setRarity] = useState<ItemRarity>(exsitingArmour?.rarity || "Common");
    const [classType, setClassType] = useState<CharacterClass>(exsitingArmour?.classType || "Titan");
    const [resilience, setResilience] = useState<number>(exsitingArmour?.stats.resilience || 0);
    const [agility, setAgility] = useState<number>(exsitingArmour?.stats.agility || 0);
    const [intelligence, setIntelligence] = useState<number>(exsitingArmour?.stats.intelligence || 0);
    const [weaponHandling, setWeaponHandling] = useState<number>(exsitingArmour?.stats.weaponHandling || 0);
    const [abilityPower, setAbilityPower] = useState<number>(exsitingArmour?.stats.abilityPower || 0);
    const [lightLevel, setLightLevel] = useState<number>(exsitingArmour?.stats.lightLevel || 0);
    const [armourType, setArmourType] = useState<ArmourType>(exsitingArmour?.armourType || "Helmet");

    const [file, setFile] = useState<File|undefined>(undefined);

    const handleSubmit = () => {
        onSubmit({
            id: id,
            name: name,
            description: description,
            rarity: rarity,
            classType: classType,
            stats: {
                resilience: resilience,
                agility: agility,
                intelligence: intelligence,
                weaponHandling: weaponHandling,
                abilityPower: abilityPower,
                lightLevel:  lightLevel
            },
            armourType: armourType
        }, file);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempFile = e.target.files?.[0];
        if (tempFile) {
            setFile(tempFile);
        } else {
            setFile(undefined);
        }
    }

    return (
       <div className="grid grid-cols-3 gap-4">
            <div>
                <label className="block mb-2 text-white">Name:</label>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                />
            </div>
            <div>
                <label className="block mb-2 text-white">Armour Type:</label>
                <select 
                    value={armourType}
                    onChange={(e) => setArmourType(e.target.value as ArmourType)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                >
                    <option className="bg-amber-700" value="Helmet">Helmet</option>
                    <option className="bg-amber-700" value="Gauntlets">Gauntlets</option>
                    <option className="bg-amber-700" value="Chest">Chest</option>
                    <option className="bg-amber-700" value="Legs">Legs</option>
                    <option className="bg-amber-700" value="ClassItem">ClassItem</option>
                </select>
            </div>
            <div>
                <label className="block mb-2 text-white">Class Type:</label>
                <select 
                    value={classType}
                    onChange={(e) => setClassType(e.target.value as CharacterClass)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                >
                    <option className="bg-amber-700" value="Titan">Titan</option>
                    <option className="bg-amber-700" value="Hunter">Hunter</option>
                    <option className="bg-amber-700" value="Warlock">Warlock</option>
                </select>
            </div>
            <div>
                <label className="block mb-2 text-white">description:</label>
                <input 
                    type="text" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                />
            </div>
            <div>
                <label className="block mb-2 text-white">Rarity:</label>
                <select 
                    value={rarity}
                    onChange={(e) => setRarity(e.target.value as ItemRarity)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                >
                    <option className="bg-amber-700" value="Common">Common</option>
                    <option className="bg-amber-700" value="Uncommon">Uncommon</option>
                    <option className="bg-amber-700" value="Rare">Rare</option>
                    <option className="bg-amber-700" value="Legendary">Legendary</option>
                    <option className="bg-amber-700" value="Exotic">Exotic</option>
                </select>
            </div>
            <div>
                <label className="block mb-2 text-white">Image:</label>
                <input 
                    type="file"
                    accept=".png,.jpg"
                    onChange={handleFileChange}
                    className="bg-amber-700 w-full border-2 p-1 rounded-xl"
                />
            </div>
            <div>
                <label className="block mb-2 text-white">Resilience:</label>
                <input 
                    type="number" 
                    value={resilience}
                    onChange={(e) => setResilience(Number.parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                />
            </div>
            <div>
                <label className="block mb-2 text-white">Agility:</label>
                <input 
                    type="number" 
                    value={agility}
                    onChange={(e) => setAgility(Number.parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                />
            </div>
            <div>
                <label className="block mb-2 text-white">Intelligence:</label>
                <input 
                    type="number" 
                    value={intelligence}
                    onChange={(e) => setIntelligence(Number.parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                />
            </div>
            <div>
                <label className="block mb-2 text-white">Weapon Handling:</label>
                <input 
                    type="number" 
                    value={weaponHandling}
                    onChange={(e) => setWeaponHandling(Number.parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                />
            </div>
            <div>
                <label className="block mb-2 text-white">Ability Power:</label>
                <input 
                    type="number" 
                    value={abilityPower}
                    onChange={(e) => setAbilityPower(Number.parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                />
            </div>
            <div>
                <label className="block mb-2 text-white">Light Level:</label>
                <input 
                    type="number" 
                    value={lightLevel}
                    onChange={(e) => setLightLevel(Number.parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                />
            </div>
            <div className="col-span-3">
                <button 
                    onClick={handleSubmit}
                    className="mt-4 px-4 py-2 bg- text-white rounded-lg w-full bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800"
                >
                    {submitButtonText}
                </button>
            </div>
        </div>
    )
}