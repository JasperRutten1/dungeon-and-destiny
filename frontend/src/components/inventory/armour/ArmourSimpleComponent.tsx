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

const Stat = ({ icon, value }: { icon: React.ReactNode; value: number }) => (
    <div className="flex items-center justify-center gap-1">
        {icon}
        <span>{value}</span>
    </div>
);

export const ArmourSimpleComponent: React.FC<ArmourSimpleComponentProps> = ({ armour, onClick }) => {
    const rarityBg = rarityBgMap[armour.rarity];

    return (
        <div
            className={`
                w-full h-full
                flex flex-col
                p-2
                gap-2
                hover:bg-white/5
                rounded-lg
                transition
                ${onClick ? "cursor-pointer" : ""}
            `}
            onClick={onClick}
        >
            {armour.image && (
                <div className="w-full">
                    <div className={`aspect-square border-2 rounded-md overflow-hidden ${rarityBg}`}>
                        <img
                            src={`http://localhost:8080${armour.image}`}
                            alt="armour"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-3 gap-1 text-amber-700 text-xs sm:text-sm">
                <Stat icon={<GiHearts />} value={armour.stats.resilience} />
                <Stat icon={<GiRunningNinja />} value={armour.stats.agility} />
                <Stat icon={<GiOpenBook />} value={armour.stats.intelligence} />
                <Stat icon={<GiPistolGun />} value={armour.stats.weaponHandling} />
                <Stat icon={<GiEnlightenment />} value={armour.stats.abilityPower} />
                <Stat icon={<GiUpgrade />} value={armour.stats.lightLevel} />
            </div>

            <p className="text-sm sm:text-base font-bold text-amber-700 text-center">
                {armour.name}
            </p>
        </div>
    );
};