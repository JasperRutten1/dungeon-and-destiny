import { SmallCharacterComponent } from "./characters/SmallCharacterComponent"


export const Header: React.FC = () => {
    return (
        <div className="
            w-full
            flex flex-col lg:flex-row
            gap-2
            border-2 border-solid
            justify-between items-start lg:items-center
            px-4 py-3
            rounded-lg shadow-lg
            bg-indigo-950/30 backdrop-blur-md
        ">
            <h1 className="
                text-2xl sm:text-3xl lg:text-4xl
                font-bold
                text-amber-700
            ">
                Dungeons & Destiny
            </h1>

            <SmallCharacterComponent />
        </div>
    )
}