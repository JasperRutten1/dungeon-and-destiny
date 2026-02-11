import { Link } from "react-router-dom";



export const AdminNav: React.FC = () => {
    return (
        <div className="flex flex-row justify-between items-center border-b-2 border-primary pb-2 mb-4">
            <h2 className="text-2xl font-bold text-amber-700">Admin Panel</h2>
            <div className="flex flex-row justify-between gap-4">
                <Link to="/admin/create-guardian" className="text-white text-lg px-4 py-2 bg-gradient-to-r from-amber-700 to-orange-700 rounded-lg">Create Guardian</Link>
                <Link to="/admin/create-weapon" className="text-white text-lg px-4 py-2 bg-gradient-to-r from-amber-700 to-orange-700 rounded-lg">Create Weapon</Link>
                <Link to="/admin/create-armour" className="text-white text-lg px-4 py-2 bg-gradient-to-r from-amber-700 to-orange-700 rounded-lg">Create Armour</Link>
                <Link to="/admin/items-overview" className="text-white text-lg px-4 py-2 bg-gradient-to-r from-amber-700 to-orange-700 rounded-lg">Items Overview</Link>
            </div>
            
        </div>
        
    );
}