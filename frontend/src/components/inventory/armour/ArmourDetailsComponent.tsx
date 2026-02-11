import type { Armour } from "@dungeons/shared";
import { rarityBgMap } from "../../../types";

interface ArmourDetailsComponentProps {
    armour: Armour;
}

export const ArmourDetailsComponent: React.FC<ArmourDetailsComponentProps> = ({ armour }) => {
    const rarityBg = rarityBgMap[armour.rarity];

    return (
        <>
            <div className="border-2 rounded-xl p-4 flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2 items-start w-3/5">
                        {armour.image && <img className={`flex items-center justify-center border-2 rounded-sm ${rarityBg} w-1/2`} src={`http://localhost:8080${armour.image}`} alt="armour" />}
                        <h3 className="text-xl font-bold text-amber-700">{armour.name}</h3>
                        <p className="text-amber-700">{armour.rarity} {armour.armourType} - Class: {armour.classType}</p>
                    </div>
                    <div className="flex flex-row w-2/5 items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <p className="text-amber-700">Resilience:</p>
                            <p className="text-amber-700">Agility:</p>
                            <p className="text-amber-700">Intelligence:</p>
                            <p className="text-amber-700">Weapon handling:</p>
                            <p className="text-amber-700">Ability power:</p>
                            <p className="text-amber-700">Light Level:</p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                            <p className="text-amber-700">{armour.stats.resilience}</p>
                            <p className="text-amber-700">{armour.stats.agility}</p>
                            <p className="text-amber-700">{armour.stats.intelligence}</p>
                            <p className="text-amber-700">{armour.stats.weaponHandling}</p>
                            <p className="text-amber-700">{armour.stats.abilityPower}</p>
                            <p className="text-amber-700">{armour.stats.lightLevel}</p>
                        </div>
                        
                    </div>
                </div>
                {armour.description && <div>
                    <p className="text-amber-700">{armour.description}</p>
                </div>}
            </div>
        </>
    )
};