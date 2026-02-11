import { Route, Routes } from "react-router-dom";
import { CreateGuardianComponent } from "./CreateGuardianComponent";
import { CreateWeaponComponent } from "./weapons/CreateWeaponComponent";
import { AdminNav } from "./AdminNav";
import { useEffect, useState, useRef } from "react";
import type { Weapon, Armour } from "@dungeons/shared";
import ItemService from "../../services/ItemService";
import { ArmourContext, WeaponContext } from "../../contexts/contexts";
import { CreateArmourComponent } from "./armour/CreateArmourComponent";
import { AdminAllItemsOverviewComponent } from "./AdminAllItemsOverviewComponent";


export const AdminComponent: React.FC = () => {
    
    const [weapons, setWeapons] = useState<Array<Weapon>>([]);
    const [armour, setArmour] = useState<Array<Armour>>([])

    const fetchWeapons = async () => {
        ItemService.getAllWeapons().then((data) => {
            setWeapons(data);
            console.log("Fetched weapons:", data);
        }).catch((err) => {
            console.error("Error fetching weapons:", err);
        });
    }

    const fetchArmour = async () => {
        ItemService.getAllArmor().then(data => {
            setArmour(data);
            console.log("Fetched armour:", data);
        }).catch((err) => {
            console.error("Error fetching armour:", err);
        });
    }

    const fetchedRef = useRef(false);
    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        fetchWeapons();
        fetchArmour();
    }, []);

    return (
        <>  
            <WeaponContext.Provider value={{ value: weapons, update: fetchWeapons }}>
                <ArmourContext.Provider value={{value: armour, update: fetchArmour}}>
                    <div className="border-primary border-2 h-full w-full rounded-lg shadow-lg p-4 flex flex-col gap-4 overflow-auto no-scrollbar">
                        <AdminNav/>
                        <Routes>
                            <Route path="/" element={<CreateGuardianComponent/>}/>
                            <Route path="/create-guardian" element={<CreateGuardianComponent/>}/>
                            <Route path="/create-weapon" element={<CreateWeaponComponent/>}/>
                            <Route path="/create-armour" element={<CreateArmourComponent/>}/>
                            <Route path="/items-overview" element={<AdminAllItemsOverviewComponent/>}/>
                        </Routes>
                    </div>
                </ArmourContext.Provider>
            </WeaponContext.Provider>
            
        </>
    );
}