import type { ElementType, ItemRarity, Weapon, WeaponCategory, WeaponType } from "@dungeons/shared";
import React, { useState } from "react";

interface WeaponFormProps{
    onSubmit: (weapon: Weapon, file: File |null) => void;
    submitButtonText: string;
    existingWeapon?: Weapon;
}

export const WeaponsForm: React.FC<WeaponFormProps> = ({onSubmit, submitButtonText, existingWeapon}) => {
    const [id] = useState<number|undefined>(existingWeapon?.id || undefined);
    const [name, setName] = useState<string>(existingWeapon?.name || "");
    const [description, setDescription] = useState<string>(existingWeapon?.description || "");
    const [weaponType, setWeaponType] = useState<WeaponType>(existingWeapon?.weaponType || "Primary");
    const [weaponCategory, setWeaponCategory] = useState<WeaponCategory>(existingWeapon?.weaponCategory || "AutoRifle");
    const [rarity, setRarity] = useState<ItemRarity>(existingWeapon?.rarity || "Common");
    const [accuracy, setAccuracy] = useState<number>(existingWeapon?.stats.accuracy || 0);
    const [range, setRange] = useState<number>(existingWeapon?.stats.range || 0);
    const [magazineSize, setMagazineSize] = useState<number>(existingWeapon?.stats.magazineSize || 0);
    const [damage, setDamage] = useState<string>(existingWeapon?.stats.damage || "");
    const [elementType, setElementType] = useState<ElementType>(existingWeapon?.elementType || "Kinetic");

    const [file, setFile] = useState<File|null>(null);

    const handleSubmit = () => {
        onSubmit({
            id: id,
            name: name,
            description: description,
            rarity: rarity,
            weaponType: weaponType,
            weaponCategory: weaponCategory,
            stats: {
                accuracy: accuracy,
                range: range,
                magazineSize: magazineSize,
                damage: damage
            },
            elementType: elementType
        }, file);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempFile = e.target.files?.[0];
        if (tempFile) {
            setFile(tempFile);
        } else {
            setFile(null);
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
                <label className="block mb-2 text-white">Weapon Type:</label>
                <select 
                    value={weaponType}
                    onChange={(e) => setWeaponType(e.target.value as WeaponType)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                >
                    <option className="bg-amber-700" value="Primary">Primary</option>
                    <option className="bg-amber-700" value="Secondary">Secondary</option>
                    <option className="bg-amber-700" value="Power">Power</option>
                </select>
            </div>
            <div>
                <label className="block mb-2 text-white">Weapon Category:</label>
                <select 
                    value={weaponCategory}
                    onChange={(e) => setWeaponCategory(e.target.value as WeaponCategory)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                >
                    <option className="bg-amber-700" value="AutoRifle">Auto Rifle</option>
                    <option className="bg-amber-700" value="HandCannon">Hand Cannon</option>
                    <option className="bg-amber-700" value="PulseRifle">Pulse Rifle</option>
                    <option className="bg-amber-700" value="ScoutRifle">Scout Rifle</option>
                    <option className="bg-amber-700" value="Shotgun">Shotgun</option>
                    <option className="bg-amber-700" value="Sniper">Sniper</option>
                    <option className="bg-amber-700" value="Pistol">Pistol</option>
                    <option className="bg-amber-700" value="RocketLauncher">Rocket Launcher</option>
                    <option className="bg-amber-700" value="Sword">Sword</option>
                    <option className="bg-amber-700" value="SubmachineGun">Submachine Gun</option>
                    <option className="bg-amber-700" value="Sidearm">Sidearm</option>
                    <option className="bg-amber-700" value="GrenadeLauncher">Grenade Launcher</option>
                    <option className="bg-amber-700" value="Bow">Bow</option>
                    <option className="bg-amber-700" value="MachineGun">Machine Gun</option>
                    <option className="bg-amber-700" value="LinearFusionRifle">Linear Fusion Rifle</option>
                    <option className="bg-amber-700" value="TraceRifle">Trace Rifle</option>
                </select>
            </div>
            <div className="col-span-3">
                <label className="block mb-2 text-white">description:</label>
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full m-h-15 p-2 rounded-lg border border-gray-300 text-white"
                />
            </div>
            <div className="col-span-3">
                <label className="block mb-2 text-white">Damage:</label>
                <input 
                    type="text" 
                    value={damage}
                    onChange={(e) => setDamage(e.target.value)}
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
                <label className="block mb-2 text-white">Element Type:</label>
                <select 
                    value={elementType}
                    onChange={(e) => setElementType(e.target.value as ElementType)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                >
                    <option className="bg-amber-700" value="Kinetic">Kinetic</option>
                    <option className="bg-amber-700" value="Arc">Arc</option>
                    <option className="bg-amber-700" value="Solar">Solar</option>
                    <option className="bg-amber-700" value="Void">Void</option>
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
                <label className="block mb-2 text-white">Accuracy:</label>
                <input 
                    type="number" 
                    value={accuracy}
                    onChange={(e) => setAccuracy(Number.parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                />
            </div>
            <div>
                <label className="block mb-2 text-white">Range:</label>
                <input 
                    type="number" 
                    value={range}
                    onChange={(e) => setRange(Number.parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded-lg border border-gray-300 text-white"
                />
            </div>
            <div>
                <label className="block mb-2 text-white">Magazine Size:</label>
                <input 
                    type="number" 
                    value={magazineSize}
                    onChange={(e) => setMagazineSize(Number.parseInt(e.target.value) || 0)}
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
    );
}