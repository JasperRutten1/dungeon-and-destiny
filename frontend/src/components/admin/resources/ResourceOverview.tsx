import { useState } from "react";
import type { ImageResourceType, ImageResource } from "@dungeons/shared";
import { createImageResourceRequest, getAllImageResources } from "../../../services/ResourceService";

export const AdminResourceOverview: React.FC = async () => {
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<ImageResourceType>("weapon");

    const [file, setFile] = useState<File|null>(null);

    const [resources, setResources] = useState<ImageResource[]>(await getAllImageResources());

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempFile = e.target.files?.[0];
        if (tempFile) {
            setFile(tempFile);
        } else {
            setFile(null);
        }
    }

    const handleSubmit = () => {
        if(!name || !type || !file) {
            console.error("Missing required fields:", { name, type, file });
            return;
        }
        console.log("Submitting resource:", { name, type, file });
        createImageResourceRequest(name, type, file!).then(newResource => {
            console.log("Created new resource:", newResource);
            setResources([...resources, newResource]);
        });
    }

    

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Admin Resource Overview</h1>
            <p>Here you can manage all your resources in one place. Click on a resource to view, edit or delete it.</p>
             
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block mb-1 font-medium">Resource Name</label>
                    <input type="text" name="name" className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Resource Type</label>
                    <select name="type" className="w-full p-2 border rounded" value={type} onChange={(e) => setType(e.target.value as ImageResourceType)}>
                        <option value="weapon">Weapon</option>
                        <option value="armor">Armor</option>
                        <option value="item">Item</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Image</label>
                    <input type="file" name="file" className="w-full p-2 border rounded" onChange={handleFileChange} />
                </div>
                <div className="col-span-2 flex justify-end">
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Add New Resource</button>
                </div>
            </div>
        </div>
    )
};