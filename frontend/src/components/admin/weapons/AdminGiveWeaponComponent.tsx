import type { Weapon } from "@dungeons/shared";
import { WeaponDetailsComponent } from "../../inventory/weapons/WeaponDetailsComponent";
import { useContext } from "react";
import { GuardianContext, MessageContext } from "../../../contexts/contexts";
import guardianService from "../../../services/GuardianService";
import {useState} from "react"

interface AdminGiveWeaponComponentProps {
    weapon: Weapon;
}

export const AdminGiveWeaponComponent: React.FC<AdminGiveWeaponComponentProps> = ({ weapon}) => {
    const guardiansContext = useContext(GuardianContext);
    const messageContext = useContext(MessageContext);
    const [guardianId, setGuardianId] = useState<number>(-1);

    const addWeapon = () => {
        if(weapon.id == undefined) return;
        if(guardianId == -1) return;
        guardianService.giveWeapon(weapon.id, guardianId).then((m) => {
            messageContext.set(m);
        });
    }

    return (
        <div className="flex flex-col gap-2">
            <WeaponDetailsComponent weapon={weapon}/>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-amber-700 font-bold">Select Character:</label>
                    <select className="w-full p-2 rounded bg-gray-700 text-amber-700" value={guardianId} onChange={(e) => setGuardianId(Number(e.target.value))}>
                        <option value={-1} disabled>-- Select a character --</option>
                        {guardiansContext.value && guardiansContext.value.map((guardian) => (
                            <option key={guardian.id} value={guardian.id}>{guardian.name}</option>
                        ))}
                    </select>
                </div>
                <button className="self-end bg-amber-700 hover:bg-amber-600 text-white p-2 rounded" onClick={addWeapon}>Give Weapon</button>
            </div>
        </div>
    )
};