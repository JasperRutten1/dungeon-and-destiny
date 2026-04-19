import axios from "axios";
import type { ImageResource } from "@dungeons/shared";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const createImageResourceRequest = async (name: string, type: string, image: File): Promise<ImageResource> => {
    try {
        return (await axios.post(`${API_URL}/resources/images`, {
            name: name,
            type: type,
            file: image
        })).data;
    } catch (error) {
        console.error("Error creating image resource:", error);
        throw error;
    }
}

export const getImageResourceUrl = async (resourceId: number): Promise<string> => {
    try{
        const localUrl = (await axios.get(`${API_URL}/resources/image/url/${resourceId}`)).data;
        return `${API_URL}${localUrl}`;
    }
    catch (error) {
        console.error("Error fetching image resource URL:", error);
        throw error;
    }
};

export const getAllImageResources = async (): Promise<ImageResource[]> => {
    try {
        return (await axios.get(`${API_URL}/resources/images`)).data;
    } catch (error) {
        console.error("Error fetching image resources:", error);
        throw error;
    }
}