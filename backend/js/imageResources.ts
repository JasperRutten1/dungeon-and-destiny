import { loadData, modifyData, ModifyOpperation, removeDataWithId } from "./datahandler.js";
import type { ImageResource, ImageResourceType } from "@dungeons/shared";
import express from "express";
import fs from "fs/promises";
import multer from "multer";
import path from "path";

export const getImageResources = async (): Promise<ImageResource[]> => loadData<ImageResource>("imageResources", []);

export const getImageResourcesByType = async (type: ImageResourceType): Promise<ImageResource[]> => {
    const allResources = await getImageResources();
    return allResources.filter(resource => resource.type === type);
};

export const getImageResourceById = async (id: number): Promise<ImageResource | undefined> => {
    const allResources = await getImageResources();
    return allResources.find(resource => resource.id === id);
};

export const modifyImageResources = async (opperation: ModifyOpperation<ImageResource[]>) => modifyData<ImageResource>("imageResources", opperation);

export const addImageResource = async (resource: ImageResource): Promise<ImageResource> => {
    await modifyImageResources(async (resources) => {
        if (resource.id === undefined) {
            resource.id = Math.max(0, ...resources.map(r => r.id ? r.id : 0)) + 1;
        }
        return;
    });
    return resource;
};

export const removeImageResourceById = async (id: number): Promise<void> => {
    const resource = await getImageResourceById(id);
    if (!resource) {
        throw new Error(`Image resource with id ${id} not found`);
    }
    await removeImageFromFileSystem(resource);
    removeDataWithId<ImageResource>("imageResources", id);
}

const removeImageFromFileSystem = async (resource: ImageResource) => {
    try {
        await fs.unlink(`./data/images/${resource.type}/${resource.url}`);
    } catch (err) {
        console.error(`Error deleting image file: ${err}`);
    }
};

export enum SupportedImageTypes {
    Item = "item",
    Weapon = "weapon",
    Armour = "armour",
}

export const exposeStaticImageResources = async (app: express.Application) => {
    Object.values(SupportedImageTypes).forEach(rt => {
        app.use(`/images/${rt}`, express.static(`./data/images/${rt}`));
    })
};

const storeFilePostRequestHandler = async (req: express.Request, res: express.Response) => {
    const { name, type } = req.body;
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    if (!name || !type) {
        return res.status(400).json({ error: "Missing name or type in request body" });
    }
    if (!Object.values(SupportedImageTypes).includes(type)) {
        return res.status(400).json({ error: "Invalid image type" });
    }
    // Save the image resource to the data storage
    try {
        const savedResource = await addImageResource({
            name,
            type,
            url: `/images/armour/${req.file.filename}`
        });
        res.status(201).json(savedResource);
    } catch (err) {
        console.error(`Error saving image resource: ${err}`);
        res.status(500).json({ error: "Error saving image resource" });
    }
}

export const exposeImageResourceEndpoints = (app: express.Application) => {
    const getNewFileName = (_req: express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${Math.random()}${ext}`);
    }

    Object.values(SupportedImageTypes).forEach(rt => {
        const location = `./data/images/${rt}`;
        // Ensure the directory exists
        fs.mkdir(`./data/images`, { recursive: true }).catch(err => {
            console.error(`Error creating images directory: ${err}`);
        });
        fs.mkdir(location, { recursive: true }).catch(err => {
            console.error(`Error creating directory for image resources: ${err}`);
        });
        app.post(
            "/resources/image", 
            multer({
                storage: multer.diskStorage({
                    destination: location,
                    filename: getNewFileName
                })
            }).single("file"), 
            storeFilePostRequestHandler
        );
    });
};

export const exposeGetResourceUrlEndpoint = (app: express.Application) => {
    app.get("/resources/image/url/:id", async (req: express.Request, res: express.Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid image resource id" });
        }
        try {
            const resource = await getImageResourceById(id);
            if (!resource) {
                return res.status(404).json({ error: "Image resource not found" });
            }
            res.json({ url: resource.url });
        } catch (err) {
            console.error(`Error fetching image resource: ${err}`);
            res.status(500).json({ error: "Error fetching image resource" });
        }
    });
}

export const exposeGetAllImageResourcesEndpoint = (app: express.Application) => {
    app.get("/resources/images", async (_req: express.Request, res: express.Response) => {
        try {
            const resources = await getImageResources();
            res.json(resources);
        } catch (err) {
            console.error(`Error fetching image resources: ${err}`);
            res.status(500).json({ error: "Error fetching image resources" });
        }  
    });
}