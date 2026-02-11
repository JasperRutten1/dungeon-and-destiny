import type { Guardian } from "@dungeons/shared";

interface CharacterDetailsProps {
    character: Guardian;
}

export const CharacterDetailsComponent: React.FC<CharacterDetailsProps> = ({ character }) => {

    return (
        <>
            <div className="border-primary border-2 h-full w-full rounded-lg shadow-lg p-4">
                <h2 className="text-2xl font-bold text-amber-700">{character.name}</h2>
                <p className="text-white">{character.subClass} {character.characterClass}</p>
            </div>
        </>
    );
}