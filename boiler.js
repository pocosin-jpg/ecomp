const DB_NAME = 'boilDB';


// load the data 
async function reloadData() {
    const db = await openDB();
    const txClear = db.transaction(STORE_NAME, 'readwrite');
    txClear.objectStore(STORE_NAME).clear();
    await txClear.complete;
    db.close();

    const BoilBundles = [
        {
            bundle: "Blacksmith's Bundle",
            items: [
                { name: "Copper Bar", season: "", location: "Smelting Copper Ore in the Furnace", status: "Incomplete" },
                { name: "Iron Bar", season: "", location: "Smelting Iron Ore in the Furnace, Crafting the Transmute (Fe) recipe", status: "Incomplete" },
                { name: "Gold Bar", season: "", location: "Smelting Gold Ore in the Furnace, Crafting the Transmute (Au) recipe", status: "Incomplete" },
            ],
        },
        {
            bundle: "Geologist's Bundle",
            items: [
                { name: "Quartz", season: "", location: "Foraging on all floors of The Mines", status: "Incomplete" },
                { name: "Earth Crystal", season: "", location: "Foraging on floors 1-39 of The Mines, Geodes, Omni Geodes, drop from Duggies in the Mines (floors 6-29)", status: "Incomplete" },
                { name: "Frozen Tear", season: "", location: "Foraging on floors 41-79 of The Mines, Frozen Geodes, Omni Geodes, drop from Dust Sprites in the Mines (floors 41-79)", status: "Incomplete" },
                { name: "Fire Quartz", season: "", location: "Foraging on floors 81-119 of The Mines, Magma Geodes, Omni Geodes", status: "Incomplete" },
            ],
        },
        {
            bundle: "Adventurer's Bundle",
            items: [
                { name: "Slime (99)", season: "", location: "Dropped by Slimes", status: "Incomplete" },
                { name: "Bat Wing (10)", season: "", location: "Dropped by Bats in The Mines or the Skull Cavern", status: "Incomplete" },
                { name: "Solar Essence", season: "", location: "Dropped by Ghosts, Squid Kids, or Metal Heads in The Mines, dropped by Mummies or Iridium Bats in the Skull Cavern; produced by Sunfish in Fish Ponds; buy from Krobus", status: "Incomplete" },
                { name: "Void Essence", season: "", location: "Dropped by Shadow Brutes or Shadow Shamans in The Mines or Serpents in the Skull Cavern; produced by Void Salmon in Fish Ponds; buy from Krobus", status: "Incomplete" },
            ],
        },
    ];


    for (const bundle of BoilBundles) {
        await addBundle(bundle);
    }

    renderBundles();
}