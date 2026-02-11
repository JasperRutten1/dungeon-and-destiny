import { useContext } from "react";
import { CharacterContext } from "../../contexts/contexts";
import { Link } from "react-router-dom";


export const SmallCharacterComponent: React.FC = () => {
    const charContext = useContext(CharacterContext);

    // Seelct character button
    if(!charContext.value){
        return (
            <nav className="text-white text-lg px-4 py-2 bg-gradient-to-r from-amber-700 to-orange-700 rounded-lg flex">
                <Link className="w-full h-full" to="/characters">Select Character</Link>
            </nav>
        );
    }

    // Display character info
    else return (
        <nav className="border-primary border-2 rounded-lg shadow-lg p-4 bg-gradient-to-r from-amber-700 to-orange-700 flex">
            <Link className="w-full h-full flex flex-row gap-4" to="/characters">
                <h2 className="text-2xl font-bold text-indigo-900">{charContext.value.name}</h2>
                <p className="text-white font-bold text-2xl">{charContext.value.subClass} {charContext.value.characterClass}</p>
            </Link>
        </nav>
    );
}