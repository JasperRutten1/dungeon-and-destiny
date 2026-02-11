import type { Weapon } from "@dungeons/shared";
import { rarityBgMap } from "../../../types";

interface WeaponDetailsComponentProps {
    weapon: Weapon;
}

export const WeaponDetailsComponent: React.FC<WeaponDetailsComponentProps> = ({ weapon }) => {
    const rarityBg = rarityBgMap[weapon.rarity];

    return (
        <>
            <div className="border-2 rounded-xl p-4 flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <div className="flex gap-3">
                        {weapon.image && <img className={`w-30 max-h30 border-2 rounded-sm ${rarityBg}`} src={`http://localhost:8080${weapon.image}`} alt="gun" />}
                        <div className="flex flex-col gap-2 items-start">
                            <h3 className="text-xl font-bold text-amber-700">{weapon.name}</h3>
                            <p className="text-amber-700">{weapon.elementType} {weapon.weaponCategory}</p>
                            <p className="text-amber-700">{weapon.weaponType} Weapon</p>
                            <p className="text-amber-700">{weapon.rarity}</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-8 justify-between">
                        <div className="flex flex-col gap-2">
                            <p className="text-amber-700">Accuracy:</p>
                            <p className="text-amber-700">Range:</p>
                            <p className="text-amber-700">Magazine Size:</p>
                            {weapon.stats.blastRadius && <p className="text-amber-700">Blast Radius:</p>}
                            <p className="text-amber-700">Damage:</p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                            <p className="text-amber-700">{weapon.stats.accuracy}</p>
                            <p className="text-amber-700">{weapon.stats.range}</p>
                            <p className="text-amber-700">{weapon.stats.magazineSize}</p>
                            {weapon.stats.blastRadius && <p className="text-amber-700">{weapon.stats.blastRadius}</p>}
                            <p className="text-amber-700">{weapon.stats.damage}</p>
                        </div>
                        
                    </div>
                </div>
                
                <div>
                    <p className="text-amber-700">{weapon.description}</p>
                </div>
            </div>
        </>
    )
};