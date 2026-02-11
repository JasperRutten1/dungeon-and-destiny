import express from "express";
import cors from "cors";
import { addGuardian, getGuardians, giveArmour, giveItem, giveWeapon } from "./js/guardians.js";
import { addWeapon, getItems, addItem, addArmor, getWeapons, getArmor, getGuardianWeaponStorage, getGuardianItemStorage, getGuardianArmourStorage, equipArmour } from "./js/items.js";
const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.listen(8080, () => {
    console.log("server started at port 8080");
});
/*
--------------------------------------------------
Guardians
--------------------------------------------------
*/
app.get("/guardians", async (_req, res) => {
    res.json(await getGuardians());
    console.log("Sent guardians data");
});
app.post("/guardians", async (req, res) => {
    console.log("Received request body:", req.body);
    const created = await addGuardian(req.body);
    res.status(201).json(created);
    console.log("Added new guardian:", created);
});
/*
--------------------------------------------------
Guardians inventories | Items
--------------------------------------------------
*/
app.post("/guardians/items/give", async (req, res) => {
    giveItem(req.body.guardianId, req.body.itemId).then(() => {
        res.json({ message: "Added item to Character" });
        console.log("Added item to guardian inventory");
    });
});
app.get("/guardians/items/:guardianId", async (req, res) => {
    const items = await getGuardianItemStorage(Number(req.params.guardianId));
    res.json(items);
    console.log("Sending guardian weapon storage:");
});
/*
--------------------------------------------------
Guardians inventories | Weapons
--------------------------------------------------
*/
app.post("/guardians/weapons/give", async (req, res) => {
    giveWeapon(req.body.guardianId, req.body.weaponId).then(() => {
        res.json({ message: "Added Weapon to Character" });
        console.log("Added weapon to guardian inventory");
    });
});
app.get("/guardians/weapons/:guardianId", async (req, res) => {
    const weapons = await getGuardianWeaponStorage(Number(req.params.guardianId));
    res.json(weapons);
    console.log("Sending guardian weapon storage:");
});
/*
--------------------------------------------------
Guardians inventories | Armour
--------------------------------------------------
*/
app.post("/guardians/armour/give", async (req, res) => {
    giveArmour(req.body.guardianId, req.body.armourId).then(() => {
        res.json({ message: "Added armour to Character" });
        console.log("Added armour to guardian inventory");
    });
});
app.get("/guardians/armour/:armourId", async (req, res) => {
    const armour = await getGuardianArmourStorage(Number(req.params.armourId));
    res.json(armour);
    console.log("Sending guardian armour storage:");
});
/*
--------------------------------------------------
items | Items
--------------------------------------------------
*/
app.get("/items", async (_req, res) => {
    res.json(await getItems());
    console.log("Sent items data");
});
app.post("/items", async (req, res) => {
    console.log("Received request body for item:", req.body);
    await addItem(req.body);
    res.status(201).send("Item added");
    console.log("Added new item:", req.body);
});
/*
--------------------------------------------------
items | Weapons
--------------------------------------------------
*/
app.get("/items/weapons", async (_req, res) => {
    res.json(await getWeapons());
    console.log("Sent weapons data");
});
app.post("/items/weapons", async (req, res) => {
    console.log("Received request body for weapon:", req.body);
    await addWeapon(req.body);
    res.status(201).send("Weapon added");
    console.log("Added new weapon:", req.body);
});
/*
--------------------------------------------------
items | Armour
--------------------------------------------------
*/
app.get("/items/armour", async (_req, res) => {
    res.json(await getArmor());
    console.log("Sent armor data");
});
app.post("/items/armour", async (req, res) => {
    console.log("Received request body for armor:", req.body);
    await addArmor(req.body);
    res.status(201).send("Armor added");
    console.log("Added new armor:", req.body);
});
app.post("items/armour/equip", async (req, res) => {
    const armour = await equipArmour(req.body.guardianId, req.body.armourId);
    res.json(armour);
    console.log(`equipped armour: ${armour}`);
});
