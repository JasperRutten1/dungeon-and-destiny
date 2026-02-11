import type { Armour } from "@dungeons/shared";
import { rarityBgMap } from "../../../types";

interface ArmourDetailsComponentProps {
    armour: Armour;
}

const StatRow = ({ label, value }: { label: string; value: number }) => (
    <>
        <p className="font-medium">{label}:</p>
        <p className="text-right font-semibold">{value}</p>
    </>
);

export const ArmourDetailsComponent: React.FC<ArmourDetailsComponentProps> = ({ armour }) => {
    const rarityBg = rarityBgMap[armour.rarity];

    return (
        <div className="border-2 rounded-xl p-4 sm:p-6 flex flex-col gap-6 bg-gray-900/40">

            <div className="flex flex-col lg:flex-row gap-6 lg:justify-between">

                {/* IMAGE + BASIC INFO */}
                <div className="flex flex-col gap-4">

                    {armour.image && (
                        <div className="w-full sm:w-48">
                            <div className={`aspect-square border-2 rounded-md overflow-hidden ${rarityBg}`}>
                                <img
                                    src={`http://localhost:8080${armour.image}`}
                                    alt="armour"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    <div className="text-amber-700">
                        <h3 className="text-xl sm:text-2xl font-bold">
                            {armour.name}
                        </h3>
                        <p>
                            {armour.rarity} {armour.armourType}
                        </p>
                        <p>
                            Class: {armour.classType}
                        </p>
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
                    <StatRow label="Resilience" value={armour.stats.resilience} />
                    <StatRow label="Agility" value={armour.stats.agility} />
                    <StatRow label="Intelligence" value={armour.stats.intelligence} />
                    <StatRow label="Weapon Handling" value={armour.stats.weaponHandling} />
                    <StatRow label="Ability Power" value={armour.stats.abilityPower} />
                    <StatRow label="Light Level" value={armour.stats.lightLevel} />
                </div>

            </div>

            {armour.description && (
                <div className="border-t border-gray-700 pt-4">
                    <p className="text-amber-700 text-sm sm:text-base leading-relaxed">
                        {armour.description}
                    </p>
                </div>
            )}

        </div>
    );
};