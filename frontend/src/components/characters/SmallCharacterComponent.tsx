import { useContext } from "react";
import { CharacterContext } from "../../contexts/contexts";
import { Link } from "react-router-dom";


export const SmallCharacterComponent: React.FC = () => {
    const charContext = useContext(CharacterContext);

    // Select character button
    if (!charContext.value) {
        return (
            <nav className="
                text-white
                text-sm sm:text-base
                px-4 py-2
                bg-gradient-to-r from-amber-700 to-orange-700
                rounded-lg
                flex justify-center
                w-full lg:w-auto
            ">
                <Link className="w-full text-center" to="/characters">
                    Select Character
                </Link>
            </nav>
        );
    }

    // Display character info
    return (
        <nav className="
            border-2 border-primary
            rounded-lg shadow-lg
            px-3 py-2
            bg-gradient-to-r from-amber-700 to-orange-700
            w-full lg:w-auto">
            <Link className="flex flex-row gap-1 sm:gap-4 justify-between items-start sm:items-center" to="/characters">
                <h2 className="
                    text-lg sm:text-xl lg:text-2xl
                    font-bold
                    text-indigo-900
                ">
                    {charContext.value.name}
                </h2>

                <p className="text-white font-bold text-lg lg:text-xl">
                    {charContext.value.subClass} {charContext.value.characterClass}
                </p>
            </Link>
        </nav>
    );
};