import type { Armour } from "@dungeons/shared";
import { useContext } from "react";
import { GuardianContext, MessageContext, type GuardianContextType } from "../../../contexts/contexts";
import guardianService from "../../../services/GuardianService";
import {useState} from "react"
import { ArmourDetailsComponent } from "../../inventory/armour/ArmourDetailsComponent";

interface AdminGiveArmourComponentProps {
    armour: Armour;
}

export const AdminGiveArmourComponent: React.FC<AdminGiveArmourComponentProps> = ({ armour }) => {
    const guardiansContext = useContext<GuardianContextType>(GuardianContext);
    const [guardianId, setGuardianId] = useState<number>(-1);

    const messageContext = useContext(MessageContext);

    const addArmour = () => {
        if(armour.id == undefined) return;
        if(guardianId == -1) return;
        guardianService.giveArmour(armour.id, guardianId).then((m) => {
            messageContext.set(m);
        });
    }

    return (
        <div className="flex flex-col gap-4">
            <ArmourDetailsComponent armour={armour} />
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-amber-700 font-bold">Select Character:</label>
                    <select className="w-full p-2 rounded bg-gray-700 text-amber-700" value={guardianId} onChange={(e) => setGuardianId(Number(e.target.value))}>
                        <option value={-1} disabled>-- Select a character --</option>
                        {guardiansContext.value && guardiansContext.value.filter(g => g.characterClass == armour.classType).map((guardian) => (
                            <option key={guardian.id} value={guardian.id}>{guardian.name}</option>
                        ))}
                    </select>
                </div>
                <button className="self-end bg-amber-700 hover:bg-amber-600 text-white p-2 rounded" onClick={addArmour}>Give Armour</button>
            </div>
        </div>
    )
};