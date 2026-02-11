import fs from "fs/promises";

export const loadData = async <T = any>(name: string, defaultData: T[] = []): Promise<T[]> => {
  try {
    const data = await fs.readFile(`./data/${name}.json`, "utf8");
    if (data === undefined || data === null || data === "") return defaultData;
    return JSON.parse(data) as T[];
  } catch (err) {
    console.error("Error reading file:", err);
    await saveData(defaultData, name);
    return defaultData;
  }
};

export const saveData = async (data: any, name: string) => {
  try {
    await fs.writeFile(`./data/${name}.json`, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing file:", err);
  }
};

export type ModifyOpperation<T> = (data: T) => void | Promise<void>


export const modifyData = async <T>(name: string, opperation: ModifyOpperation<T[]>) => {
  let data = await loadData<T>(name);
  await opperation(data);
  await saveData(data, name);
}

export type DataFilter<T> = (data: T) => boolean;

export const modifyFilteredData = async <T>(name: string, filter: DataFilter<T>, opperation: ModifyOpperation<T>): Promise<T> => {
  let modified!: T;
  
  await modifyData<T>(name, async data => {
    const index = data.findIndex(filter);

    if (index === -1) {
      throw new Error(`No ${name} entry matched the filter`);
    }

    await opperation(data[index]);
    modified = data[index];
  })

  return modified;
}

export const modifyDataWithId = async <T extends {id?: number}>(name: string, id:number, opperation: ModifyOpperation<T>): Promise<T> => modifyFilteredData(name, data => data.id === id, opperation);
