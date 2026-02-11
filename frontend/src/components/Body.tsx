import { Header } from "./Header"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { Characters } from "./characters/Characters"
import { AdminComponent } from "./admin/AdminComponent"
import { CharacterContext, GuardianContext } from "../contexts/contexts"
import { useEffect, useState, useRef } from "react"
import type { Guardian } from "@dungeons/shared"
import guardianService from "../services/GuardianService"
import { InventoryManagerComponent } from "./inventory/InventoryManagerComponent"
import { CharacterOverview } from "./character/CharacterOverview"

export const Body: React.FC = () => {
    const [guardians, setGuardians] = useState<Array<Guardian>|undefined>(undefined);
    const [selectedCharacter , setSelectedCharacter] = useState<Guardian|undefined>(undefined);

    const fetchGuardians = () => {
        guardianService.getGuardianData().then(data => setGuardians(data));
    }

    const fetchedRef = useRef(false);
    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        fetchGuardians();
    }, []);

    return (
        <>
        <div className="min-h-screen max-h-screen bg-gradient-to-r from-indigo-800 to-indigo-900 flex w-full">
            <CharacterContext.Provider value={{ value: selectedCharacter, set: setSelectedCharacter }}> 
                <GuardianContext.Provider value={{ value: guardians, update: fetchGuardians }}>
                    <BrowserRouter>
                        <div className="grid grid-cols-5 grid-rows-7 gap-2 w-full p-2 ">
                            <div className="col-span-6 w-full h-full">
                                <Header/>
                            </div>
                            <div className="row-start-2 row-span-6 flex flex-col justify-start items-start gap-4 h-full border-primary border-2 rounded-lg p-4 shadow-lg">
                                <nav className="text-white text-lg px-4 py-2 bg-gradient-to-r from-amber-700 to-orange-700 rounded-lg w-full flex">
                                    <Link className="w-full h-full" to="/character">Character</Link>
                                </nav>
                                <nav className="text-white text-lg px-4 py-2 bg-gradient-to-r from-amber-700 to-orange-700 rounded-lg w-full flex">
                                    <Link className="w-full h-full" to="/inventory">Inventory</Link>
                                </nav>
                                <nav className="text-white text-lg px-4 py-2 bg-gradient-to-r from-amber-700 to-orange-700 rounded-lg w-full flex">
                                    <Link to="/admin/" className="w-full h-full">Admin</Link>
                                </nav>
                            </div>
                            <div className="col-span-5 row-start-2 row-span-6">
                                <Routes>
                                    <Route path="/" element={<Characters/>}></Route>
                                    <Route path="/characters" element={<Characters/>}></Route>
                                    <Route path="/character" element={<CharacterOverview/>}></Route>
                                    <Route path="/inventory" element={<InventoryManagerComponent/>}></Route>
                                    <Route path="/admin/*" element={<AdminComponent/>}></Route>
                                </Routes>
                            </div>
                        </div>
                    </BrowserRouter>
                </GuardianContext.Provider>
            </CharacterContext.Provider>
            
        </div>
        </>
    )
}