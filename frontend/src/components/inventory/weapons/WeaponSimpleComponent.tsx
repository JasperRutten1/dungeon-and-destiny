import type { Weapon } from "@dungeons/shared";
import { rarityBgMap } from "../../../types";

interface WeaponSimpleComponentProps {
    weapon: Weapon;
    onClick?: () => void;
}

export const WeaponSimpleComponent: React.FC<WeaponSimpleComponentProps> = ({ weapon, onClick }) => {
    const rarityBg = rarityBgMap[weapon.rarity];

    return (
        <>
        <div className={`flex flex-row border-2 h-full px-4 p-2 gap-4 hover:bg-white/5 ${onClick ? "cursor-pointer": ""}`} onClick={onClick}>
            {weapon.image && <img className={`flex items-center justify-center border-2 rounded-sm ${rarityBg}`} src={`http://localhost:8080${weapon.image}`} alt="gun" />}
            <div className="flex flex-col gap-2 w-full justify-between">
                <div className="flex flex-row justify-between">
                    <h3 className="text-xl font-bold text-amber-700">{weapon.name}</h3>
                    <p className="text-amber-700">{weapon.weaponType} Weapon</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-amber-700">{weapon.elementType} {weapon.weaponCategory}</p>
                    <p className="text-amber-700">{weapon.rarity}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-amber-700">{weapon.stats.damage}</p>
                    <p className="text-amber-700">{weapon.stats.accuracy} / {weapon.stats.range} / {weapon.stats.magazineSize}{weapon.stats.blastRadius && ` / ${weapon.stats.blastRadius}`}</p>
                </div>
            </div>
        </div>
        </>
    )
}