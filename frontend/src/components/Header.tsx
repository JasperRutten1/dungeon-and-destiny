import { SmallCharacterComponent } from "./characters/SmallCharacterComponent"


export const Header: React.FC = () => {
    return (
        <>
        <div className="h-full w-full flex flex-row gap-1 border-solid border-2 justify-between items-center px-4 rounded-lg shadow-lg">
            <h1 className="text-4xl text-shadow-lg font-bold p-2 text-amber-700">Dungeons & Destiny</h1>
            <SmallCharacterComponent/>
        </div>
        </>
    )
}