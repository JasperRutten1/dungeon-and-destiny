import express from "express";
import cors from "cors";
import { addGuardian, addHealth, getGuardians, getGuardianTotalArmourStats, giveArmour, giveItem, giveWeapon, removeHealth, resetHealth } from "./js/guardians.js";
import { addWeapon, getItems, addItem, addArmor, getWeapons, getArmor, getGuardianWeaponStorage, getGuardianItemStorage, getGuardianArmourStorage, equipArmour, getEquippedArmour, unEquipArmour, getEquippedWeapon, equipWeapon, unEquipWeapon, linkImageToWeapon, linkImageToArmour, editWeapon, editArmour } from "./js/items.js";
import multer from "multer";
import path from "path";
const weaponImages = multer({
    storage: multer.diskStorage({
        destination: "./data/images/weapons",
        filename: (_req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${Date.now()}-${Math.random()}${ext}`);
        }
    })
});
const armourImages = multer({
    storage: multer.diskStorage({
        destination: "./data/images/armour",
        filename: (_req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${Date.now()}-${Math.random()}${ext}`);
        }
    })
});
const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.listen(8080, () => {
    console.log("server started at port 8080");
});
app.use("/images/weapons", express.static("./data/images/weapons"));
app.use("/images/armour", express.static("./data/images/armour"));
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
//give the given guardian a weapon. adds it to there weapon storage.
app.post("/guardians/weapons/give", async (req, res) => {
    giveWeapon(req.body.guardianId, req.body.weaponId).then(() => {
        res.json({ message: "Added Weapon to Character" });
        console.log("Added weapon to guardian inventory");
    }).catch(err => {
        res.json({ message: err });
    });
});
//get all weapons in the weapon storage of the given guardian
app.get("/guardians/weapons/:guardianId", async (req, res) => {
    const weapons = await getGuardianWeaponStorage(Number(req.params.guardianId));
    res.json(weapons);
    console.log("Sending guardian weapon storage:");
});
// Get all equipped weapons for a guardian
app.get("/guardians/weapons/equipped/:guardianId", async (req, res) => {
    const guardianId = Number(req.params.guardianId);
    const equippedWeapons = {
        primary: await getEquippedWeapon(guardianId, "Primary"),
        secondary: await getEquippedWeapon(guardianId, "Secondary"),
        power: await getEquippedWeapon(guardianId, "Power"),
    };
    res.json(equippedWeapons);
    console.log(`sending equipped weapons:`, equippedWeapons);
});
// Equip a weapon
app.post("/guardians/weapons/equip", async (req, res) => {
    const weapon = await equipWeapon(req.body.guardianId, req.body.weaponId);
    res.json(weapon);
    console.log(`equipped weapon: ${weapon.name}`);
});
// Unequip a weapon
app.post("/guardians/weapons/unequip", async (req, res) => {
    const weapon = await unEquipWeapon(req.body.guardianId, req.body.weaponType);
    res.json(weapon);
    console.log(`unequipped weapon: ${weapon?.name}`);
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
app.get("/guardians/armour/equipped/:guardianId", async (req, res) => {
    const guardianId = Number(req.params.guardianId);
    const equippedArmour = {
        helmet: await getEquippedArmour(guardianId, "Helmet"),
        gauntlets: await getEquippedArmour(guardianId, "Gauntlets"),
        chest: await getEquippedArmour(guardianId, "Chest"),
        legs: await getEquippedArmour(guardianId, "Legs"),
        classItem: await getEquippedArmour(guardianId, "ClassItem"),
    };
    res.json(equippedArmour);
    console.log(`sending equipped armour: ${equippedArmour}`);
});
app.post("/guardians/armour/equip", async (req, res) => {
    const armour = await equipArmour(req.body.guardianId, req.body.armourId);
    res.json(armour);
    console.log(`equipped armour: ${armour.name}`);
});
app.post("/guardians/armour/unequip", async (req, res) => {
    const armour = await unEquipArmour(req.body.guardianId, req.body.armourType);
    res.json(armour);
    console.log(`unequipped armour: ${armour?.name}`);
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
    const weapon = await addWeapon(req.body);
    res.json(weapon);
    console.log("Added new weapon:", weapon);
});
app.post("/items/weapons/edit", async (req, res) => {
    const weapon = await editWeapon(req.body);
    res.json(weapon);
    console.log("Edited weapon:", weapon);
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
    const armour = await addArmor(req.body);
    res.json(armour);
    console.log("Added new armor:", armour);
});
app.post("/items/armour/edit", async (req, res) => {
    const armour = await editArmour(req.body);
    res.json(armour);
    console.log("Added new armor:", armour);
});
app.get("/guardians/armour/stats/:guardianId", async (req, res) => {
    const guardianId = Number(req.params.guardianId);
    getGuardianTotalArmourStats(guardianId).then(stats => res.json(stats)).catch(err => {
        console.log(err);
        res.status(400).send(err);
    });
});
/*
--------------------------------------------------
images
--------------------------------------------------
*/
app.post("/images/weapons/:weaponId", weaponImages.single("file"), async (req, res) => {
    console.log(req.file);
    const weaponId = Number(req.params.weaponId);
    console.log(`linking image to weapon wiht id: ${weaponId}`);
    if (!req.file)
        return res.status(400).send("No File");
    const weapon = await linkImageToWeapon(weaponId, `/images/weapons/${req.file.filename}`);
    res.json(weapon);
});
app.post("/images/armour/:armourId", armourImages.single("file"), async (req, res) => {
    console.log(req.file);
    const armourId = Number(req.params.armourId);
    console.log(`linking image to armour wiht id: ${armourId}`);
    if (!req.file)
        return res.status(400).send("No File");
    const armour = await linkImageToArmour(armourId, `/images/armour/${req.file.filename}`);
    res.json(armour);
});
/*
--------------------------------------------------
images
--------------------------------------------------
*/
app.post("/guardians/health/add", async (req, res) => {
    addHealth(req.body.guardianId, req.body.health).then(guardian => res.json(guardian)).catch(err => res.status(400).send(err));
});
app.post("/guardians/health/remove", async (req, res) => {
    removeHealth(req.body.guardianId, req.body.health).then(guardian => res.json(guardian)).catch(err => res.status(400).send(err));
});
app.post("/guardians/health/reset", async (req, res) => {
    resetHealth(req.body.guardianId).then(guardian => res.json(guardian)).catch(err => res.status(400).send(err));
});
