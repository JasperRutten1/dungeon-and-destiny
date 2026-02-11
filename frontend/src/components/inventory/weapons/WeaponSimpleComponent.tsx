import type { Weapon } from "@dungeons/shared";
import { rarityBgMap } from "../../../types";

interface WeaponSimpleComponentProps {
    weapon: Weapon;
    onClick?: () => void;
}

export const WeaponSimpleComponent: React.FC<WeaponSimpleComponentProps> = ({ weapon, onClick }) => {
    const rarityBg = rarityBgMap[weapon.rarity];

    return (
        <div
            className={`
                flex flex-row
                p-3
                gap-4
                hover:bg-white/5
                transition
                w-full
                ${onClick ? "cursor-pointer" : ""}
            `}
            onClick={onClick}
        >
            <div className="w-full flex flex-col flex-2">
                {/* IMAGE CONTAINER */}
                {weapon.image && (
                    <div className="sm:w-32 flex-shrink-0 p-2">
                        <div className={`aspect-square border-2 rounded-sm overflow-hidden ${rarityBg}`}>
                            <img
                                src={`http://localhost:8080${weapon.image}`}
                                alt="gun"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}
                <h3 className="text-lg sm:text-xl font-bold text-amber-700 p-2">
                    {weapon.name}
                </h3>
            </div>
            

            {/* TEXT INFO */}
            <div className="flex flex-col justify-between items-end gap-2 text-amber-700 flex-3">
                <p>
                    {weapon.weaponType} Weapon
                </p>
                <p>
                    {weapon.elementType} {weapon.weaponCategory}
                </p>
                <p>
                    {weapon.rarity}
                </p>
                <p>Damage: {weapon.stats.damage}</p>
                <p>
                    {weapon.stats.accuracy} / {weapon.stats.range} / {weapon.stats.magazineSize}
                    {weapon.stats.blastRadius && ` / ${weapon.stats.blastRadius}`}
                </p>
            </div>
        </div>
    );
};
