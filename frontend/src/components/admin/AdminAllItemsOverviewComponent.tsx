import { AdminArmourOverview } from "./armour/AdminArmourOverview"
import { AdminWeaponsOverview } from "./weapons/AdminWeaponsOverview"



export const AdminAllItemsOverviewComponent: React.FC = () => {
    return (
        <>
        <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-amber-700">Admin Items Overview Component</h2>
            <AdminWeaponsOverview/>
            <AdminArmourOverview/>
        </div>
        </>
    )
}