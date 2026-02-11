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
        <div className="min-h-screen bg-gradient-to-r from-indigo-800 to-indigo-900 w-full">
            <CharacterContext.Provider value={{ value: selectedCharacter, set: setSelectedCharacter }}> 
                <GuardianContext.Provider value={{ value: guardians, update: fetchGuardians }}>
                    <BrowserRouter>
                        <div className="flex flex-col lg:grid lg:grid-cols-5 lg:grid-rows-7 gap-2 w-full p-2">
                            <div className="w-full lg:col-span-5">
                                <Header/>
                            </div>
                            <div className="
                                flex flex-row lg:flex-col
                                gap-4
                                lg:row-start-2 lg:row-span-6
                                border-primary border-2 rounded-lg p-4 shadow-lg
                                bg-indigo-950/40 backdrop-blur-md
                            ">
                                <nav className="text-white text-lg px-4 py-2 bg-gradient-to-r from-amber-700 to-orange-700 rounded-lg w-full flex justify-center">
                                    <Link className="w-full text-center" to="/character">Character</Link>
                                </nav>
                                <nav className="text-white text-lg px-4 py-2 bg-gradient-to-r from-amber-700 to-orange-700 rounded-lg w-full flex justify-center">
                                    <Link className="w-full text-center" to="/inventory">Inventory</Link>
                                </nav>
                            </div>
                            <div className="lg:col-span-4 lg:row-start-2 lg:row-span-6">
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