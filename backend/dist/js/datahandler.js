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
export const modifyData = async (name, opperation) => {
    let data = await loadData(name);
    await opperation(data);
    await saveData(data, name);
};
export const modifyFilteredData = async (name, filter, opperation) => {
    let modified;
    await modifyData(name, async (data) => {
        const index = data.findIndex(filter);
        if (index === -1) {
            throw new Error(`No ${name} entry matched the filter`);
        }
        await opperation(data[index]);
        modified = data[index];
    });
    return modified;
};
export const modifyDataWithId = async (name, id, opperation) => modifyFilteredData(name, data => data.id === id, opperation);
