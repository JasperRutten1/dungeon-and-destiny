import type { Armour } from "@dungeons/shared";
import { rarityBgMap } from "../../../types";
import { GiHearts } from "react-icons/gi";
import { GiRunningNinja } from "react-icons/gi";
import { GiOpenBook } from "react-icons/gi";
import { GiPistolGun } from "react-icons/gi";
import { GiEnlightenment } from "react-icons/gi";
import { GiUpgrade } from "react-icons/gi";

interface ArmourSimpleComponentProps {
    armour: Armour;
    onClick?: () => void;
}

export const ArmourSimpleComponent: React.FC<ArmourSimpleComponentProps> = ({ armour, onClick }) => {
    const rarityBg = rarityBgMap[armour.rarity];

    return (
        <>
        <div className={`flex flex-row border-2 h-full px-4 p-2 gap-4 hover:bg-white/5 ${onClick ? "cursor-pointer": ""}`} onClick={onClick}>
            <div className="felx flex-col gap-0 w-full">
                <div className="flex flex-row gap-3 w-full">
                    {armour.image && <img className={`flex items-center justify-center border-2 rounded-sm ${rarityBg}`} src={`http://localhost:8080${armour.image}`} alt="armour" />}
                    <div className="grid grid-cols-2 gap-y-1 gap-x-4 w-full">
                        <div className="text-amber-700 flex felx-row items-center justify-between">
                            <GiHearts/>
                            <p>{armour.stats.resilience}</p>
                        </div>
                        <div className="text-amber-700 flex felx-row items-center justify-between">
                            <GiRunningNinja />
                            <p>{armour.stats.agility}</p>
                        </div>
                        <div className="text-amber-700 flex felx-row items-center justify-between">
                            <GiOpenBook />
                            <p>{armour.stats.intelligence}</p>
                        </div>
                        <div className="text-amber-700 flex felx-row items-center justify-between">
                            <GiPistolGun />
                            <p>{armour.stats.weaponHandling}</p>
                        </div>
                        <div className="text-amber-700 flex felx-row items-center justify-between">
                            <GiEnlightenment />
                            <p>{armour.stats.abilityPower}</p>
                        </div>
                        <div className="text-amber-700 flex felx-row items-center justify-between">
                            <GiUpgrade />
                            <p>{armour.stats.lightLevel}</p>
                        </div>
                    </div>
                </div>
                <p className="text-lg font-bold text-amber-700">{armour.name}</p>
            </div>
            
            
        </div>
        
        </>
    )
}