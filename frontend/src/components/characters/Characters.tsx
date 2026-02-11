import { useContext } from "react";
import { GuardianContext, type GuardianContextType } from "../../contexts/contexts";
import { SelectCharacterComponent } from "./SelectCharacterComponent";



export const Characters: React.FC = () => {
    const guardiansContext = useContext<GuardianContextType>(GuardianContext);

    return (
        <>
            <div className="border-primary border-2 h-full w-full rounded-lg shadow-lg">
                <div className="p-4 text-xl font-bold text-amber-700">Characters</div>
                <div className="grid grid-cols-2 gap-2 p-4">
                    {
                    guardiansContext.value && guardiansContext.value.map((guardian) => (
                        <div key={guardian.id} className="w-full">
                            <SelectCharacterComponent character={guardian}/>
                        </div>
                    ))
                }
                </div>
            </div>
            
        </>
    )
}

