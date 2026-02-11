import fs from "fs/promises";
export const loadData = async (name, defaultData = []) => {
    try {
        const data = await fs.readFile(`./data/${name}.json`, "utf8");
        if (data === undefined || data === null || data === "")
            return defaultData;
        return JSON.parse(data);
    }
    catch (err) {
        console.error("Error reading file:", err);
        await saveData(defaultData, name);
        return defaultData;
    }
};
export const saveData = async (data, name) => {
    try {
        await fs.writeFile(`./data/${name}.json`, JSON.stringify(data, null, 2), "utf8");
    }
    catch (err) {
        console.error("Error writing file:", err);
    }
};
