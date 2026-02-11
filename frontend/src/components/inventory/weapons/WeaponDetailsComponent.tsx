import type { Weapon } from "@dungeons/shared";
import { rarityBgMap } from "../../../types";

interface WeaponDetailsComponentProps {
    weapon: Weapon;
}

const StatRow = ({ label, value }: { label: string; value: number|string }) => (
    <>
        <p className="font-medium">{label}:</p>
        <p className="text-right font-semibold">{value}</p>
    </>
);

export const WeaponDetailsComponent: React.FC<WeaponDetailsComponentProps> = ({ weapon }) => {
    const rarityBg = rarityBgMap[weapon.rarity];

    return (
        <div className="border-2 rounded-xl p-4 sm:p-6 flex flex-col gap-6 bg-gray-900/40">

            {/* TOP SECTION */}
            <div className="flex flex-col lg:flex-row gap-6 lg:justify-between">

                {/* IMAGE + BASIC INFO */}
                <div className="flex flex-col sm:flex-row gap-4">

                    {/* Square Image */}
                    {weapon.image && (
                        <div className="w-full sm:w-40 flex-shrink-0">
                            <div className={`aspect-square border-2 rounded-md overflow-hidden ${rarityBg}`}>
                                <img
                                    src={`http://localhost:8080${weapon.image}`}
                                    alt="gun"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Weapon Info */}
                    <div className="flex flex-col gap-2 text-amber-700">
                        <h3 className="text-xl sm:text-2xl font-bold">
                            {weapon.name}
                        </h3>
                        <p>{weapon.elementType} {weapon.weaponCategory}</p>
                        <p>{weapon.weaponType} Weapon</p>
                        <p className="font-semibold">{weapon.rarity}</p>
                    </div>
                </div>

                {/* STATS */}
                <div className="
                    grid grid-cols-2
                    gap-x-6 gap-y-2
                    text-amber-700
                    text-sm sm:text-base
                    min-w-[200px]
                ">
                    <StatRow label="Accuracy" value={weapon.stats.accuracy} />
                    <StatRow label="Range" value={weapon.stats.range} />
                    <StatRow label="Magazine Size" value={weapon.stats.magazineSize} />
                    {weapon.stats.blastRadius && (
                        <StatRow label="Blast Radius" value={weapon.stats.blastRadius} />
                    )}
                    <StatRow label="Damage" value={weapon.stats.damage} />
                </div>

            </div>

            {/* DESCRIPTION */}
            {weapon.description && (
                <div className="border-t border-gray-700 pt-4">
                    <p className="text-amber-700 text-sm sm:text-base leading-relaxed">
                        {weapon.description}
                    </p>
                </div>
            )}

        </div>
    );
};