import { useContext } from "react"
import { CharacterContext, TotalArmourStatsContext } from "../../contexts/contexts"
import guardianService from "../../services/GuardianService";
import { GiHearts } from "react-icons/gi";
import { GiRunningNinja } from "react-icons/gi";
import { GiOpenBook } from "react-icons/gi";
import { GiPistolGun } from "react-icons/gi";
import { GiEnlightenment } from "react-icons/gi";
import { GiUpgrade } from "react-icons/gi";

const Stat = ({ icon, value }: { icon: React.ReactNode; value: number | undefined }) => (
    <div className="flex items-center gap-2 justify-center">
        {icon}
        <p>{value ?? 0}</p>
    </div>
);

export const CharacterClassOverview:React.FC = () => {
    const characterContext = useContext(CharacterContext);
    const totalArmourStatsContext = useContext(TotalArmourStatsContext);

    if(characterContext == null ||characterContext.value == null) return (
        <div className="flex w-full">
            <h3>Select a Character</h3>
        </div>
    )

    const getMaxHealth = () => {
        if(totalArmourStatsContext.value == null || totalArmourStatsContext.value.resilience == null) return 40;
        else return 40 + totalArmourStatsContext.value.resilience;
    }

    const addHealth = () => {
        if(characterContext == null || characterContext.value == null || characterContext.value.id == null) return;
        guardianService.addHealth(characterContext.value.id, 1).then(guardian => {
            characterContext.set(guardian);
        })
    }

    const removeHealth = () => {
        if(characterContext == null || characterContext.value == null || characterContext.value.id == null) return;
        guardianService.removeHealth(characterContext.value.id, 1).then(guardian => {
            characterContext.set(guardian);
        })
    }

    const resetHealth = () => {
        if(characterContext == null || characterContext.value == null || characterContext.value.id == null) return;
        guardianService.resetHealth(characterContext.value.id).then(guardian => {
            characterContext.set(guardian);
        })
    }

    return (
        <div className="flex flex-col lg:flex-row gap-4 m-2">

            {/* CHARACTER INFO */}
            <div className="
                flex flex-row sm:flex-row
                justify-between
                border-2
                p-4
                rounded-lg
                w-full lg:w-1/3
                gap-3
            ">
                <div className="flex flex-col justify-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-amber-700">
                        {characterContext.value.name}
                    </h3>
                    <p className="text-lg sm:text-xl font-bold text-amber-700">
                        {characterContext.value.subClass} {characterContext.value.characterClass}
                    </p>
                </div>

                <div className="flex items-center">
                    <h3 className="text-lg sm:text-xl font-bold text-amber-700">
                        Ghost: {characterContext.value.ghost.name}
                    </h3>
                </div>
            </div>

            {/* STATS */}
            <div className="
                border-2
                rounded-lg
                p-4
                w-full lg:w-1/3
            ">
                <h3 className="font-bold text-white text-xl sm:text-2xl text-center mb-4">
                    Character Stats
                </h3>

                <div className="
                    grid grid-cols-3
                    gap-4
                    text-amber-700
                    text-base sm:text-lg
                ">
                    <Stat icon={<GiHearts />} value={totalArmourStatsContext.value?.resilience} />
                    <Stat icon={<GiRunningNinja />} value={totalArmourStatsContext.value?.agility} />
                    <Stat icon={<GiOpenBook />} value={totalArmourStatsContext.value?.intelligence} />
                    <Stat icon={<GiPistolGun />} value={totalArmourStatsContext.value?.weaponHandling} />
                    <Stat icon={<GiEnlightenment />} value={totalArmourStatsContext.value?.abilityPower} />
                    <Stat icon={<GiUpgrade />} value={totalArmourStatsContext.value?.lightLevel} />
                </div>
            </div>

            {/* HEALTH */}
            <div className="
                border-2
                rounded-lg
                p-4
                w-full lg:w-1/3
                flex flex-col gap-4
            ">
                <div className="flex justify-center items-center gap-3 font-bold text-white text-xl sm:text-2xl">
                    <h3>Health:</h3>
                    <p>{characterContext.value.health} / {getMaxHealth()}</p>
                </div>

                <div className="flex flex-row sm:flex-row gap-3">
                    <button
                        onClick={addHealth}
                        className="flex-1 py-3 font-bold text-xl border-2 rounded-lg bg-gradient-to-r from-amber-700 to-orange-700"
                    >
                        +
                    </button>

                    <button
                        onClick={resetHealth}
                        className="flex-1 py-3 font-bold text-lg border-2 rounded-lg bg-gradient-to-r from-amber-700 to-orange-700"
                    >
                        Reset
                    </button>

                    <button
                        onClick={removeHealth}
                        className="flex-1 py-3 font-bold text-xl border-2 rounded-lg bg-gradient-to-r from-amber-700 to-orange-700"
                    >
                        -
                    </button>
                </div>
            </div>

        </div>
    );
}