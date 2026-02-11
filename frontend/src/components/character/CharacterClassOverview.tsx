import { useContext } from "react"
import { CharacterContext, TotalArmourStatsContext } from "../../contexts/contexts"
import guardianService from "../../services/GuardianService";
import { GiHearts } from "react-icons/gi";
import { GiRunningNinja } from "react-icons/gi";
import { GiOpenBook } from "react-icons/gi";
import { GiPistolGun } from "react-icons/gi";
import { GiEnlightenment } from "react-icons/gi";
import { GiUpgrade } from "react-icons/gi";


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
        <div className="flex flex-row gap-2 m-2">
            <div className="flex flex-row gap-2 justify-between border-2 p-3 w-1/3">
                <div className="flex flex-col gap-2 justify-center">
                    <h3 className="text-2xl font-bold text-amber-700">{characterContext.value.name}</h3>
                    <p className="text-xl font-bold text-amber-700">{characterContext.value.subClass} {characterContext.value.characterClass}</p>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                    <h3 className="text-2xl font-bold text-amber-700">{characterContext.value.ghost.name}</h3>
                </div>
            </div>
            <div className="flex flex-col border-2 w-1/3 p-3">
                <h3 className="font-bold text-white text-2xl flex justify-center w-full">Character stats:</h3>
                <div className="flex flex-row gap-1 w-full justify-between p-3 text-amber-700 text-lg">
                    <div className="flex felx-row gap-2 items-center justify-between">
                        <GiHearts/>
                        <p>{totalArmourStatsContext.value?.resilience}</p>
                    </div>
                    <div className="flex felx-row gap-2 items-center justify-between">
                        <GiRunningNinja />
                        <p>{totalArmourStatsContext.value?.agility}</p>
                    </div>
                    <div className="flex felx-row gap-2 items-center justify-between">
                        <GiOpenBook />
                        <p>{totalArmourStatsContext.value?.intelligence}</p>
                    </div>
                    <div className="flex felx-row gap-2 items-center justify-between">
                        <GiPistolGun />
                        <p>{totalArmourStatsContext.value?.weaponHandling}</p>
                    </div>
                    <div className="flex felx-row gap-2 items-center justify-between">
                        <GiEnlightenment />
                        <p>{totalArmourStatsContext.value?.abilityPower}</p>
                    </div>
                    <div className="flex felx-row gap-2 items-center justify-between">
                        <GiUpgrade />
                        <p>{totalArmourStatsContext.value?.lightLevel}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col border-2 gap-2 w-1/3 p-3">
                <div className="justify-center items-center flex flex-row gap-3 font-bold text-white text-2xl">
                    <h3>Health:</h3>
                    <p>{characterContext.value.health} / {getMaxHealth()}</p>
                </div>
                <div className="flex flex-row justify-center gap-1">
                    <button onClick={addHealth} className="w-1/5 font-bold text-2xl border-2 rounded-lg bg-gradient-to-r from-amber-700 to-orange-700">+</button>
                    <button onClick={resetHealth} className="w-1/5 font-bold text-2xl border-2 rounded-lg bg-gradient-to-r from-amber-700 to-orange-700">Reset</button>
                    <button onClick={removeHealth} className="w-1/5 font-bold text-2xl border-2 rounded-lg bg-gradient-to-r from-amber-700 to-orange-700">-</button>
                </div>
            </div>
            
        </div>
    )
}