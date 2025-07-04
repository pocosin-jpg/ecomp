const DB_NAME = 'BoardDB';


// load the data 
async function reloadData() {
    const db = await openDB();
    const txClear = db.transaction(STORE_NAME, 'readwrite');
    txClear.objectStore(STORE_NAME).clear();
    await txClear.complete;
    db.close();

    const BoardBundles = [
        {
            bundle: "Chef's Bundle",
            items: [{ name: "Maple Syrup", season: "", location: "Tapped Maple Tree", status: "Incomplete" },
            { name: "Fiddlehead Fern", season: "Summer", location: "Summer Foraging in the Secret Woods, Foraging on Prehistoric Floors at the Skull Cavern, Cutting down Green Rain Trees", status: "Incomplete" },
            { name: "Truffle", season: "", location: "Pigs", status: "Incomplete" },
            { name: "Poppy", season: "Summer", location: "Summer Crops", status: "Incomplete" },
            { name: "Maki Roll", season: "", location: "Cooking (recipe sources: The Queen of Sauce, The Saloon)", status: "Incomplete" },
            { name: "Fried Egg", season: "", location: "Cooking", status: "Incomplete" },
            ],
        },
        {
            bundle: "Dye Bundle",
            items: [
                { name: "Red Mushroom", season: "", location: "Foraging in The Mines, Summer or Fall Foraging in the Secret Woods, The Farm Cave (mushroom option), Tapping a Mushroom Tree", status: "Incomplete" },
                { name: "Sea Urchin", season: "", location: "Beach Foraging, after using 300 wood to fix the bridge to the right side of The Beach or any side of the beach during crab mating season; foraging in the Beach Farm", status: "Incomplete" },
                { name: "Sunflower", season: "Summer", location: "Summer / Fall Crops", status: "Incomplete" },
                { name: "Duck Feather", season: "", location: "Ducks", status: "Incomplete" },
                { name: "Aquamarine", season: "", location: "Aquamarine Nodes, boxes in The Mines, Fishing Treasure Chests", status: "Incomplete" },
                { name: "Red Cabbage", season: "Summer", location: "Summer Crops (Red Cabbage Seeds are available at Pierre's General Store in year 2+, at the Traveling Cart, or dropped by Serpents, Mummies, and Purple Slimes)", status: "Incomplete" },
            ],
        },
        {
            bundle: "Field Research Bundle",
            items: [
                { name: "Purple Mushroom", season: "Fall", location: "The Mines, The Farm Cave (mushroom option), Forest Farm Map Foraging in Fall", status: "Incomplete" },

                { name: "Nautilus Shell", season: "Winter", location: "Winter Beach Foraging, Beach Farm Map Foraging during any season, Random gift from Demetrius (Note: NOT the Nautilus Fossil artifact)", status: "Incomplete" },

                { name: "Chub", season: "", location: "Can be found in the mountain lake and river during all seasons, any time.", status: "Incomplete" },
                { name: "Frozen Geode", season: "", location: "The Mines floors 41-79", status: "Incomplete" },
            ],
        },
        {
            bundle: "Fodder Bundle",
            items: [
                { name: "Wheat (10)", season: "Summer", location: "Summer / Fall Crops", status: "Incomplete" },
                { name: "Hay (10)", season: "", location: "Purchase at Marnie's Ranch or Desert Trader, or harvest from Grass or Wheat.", status: "Incomplete" },
                { name: "Apple (3)", season: "Fall", location: "Apple Trees during Fall, The Farm Cave (fruit bat option)", status: "Incomplete" },
            ],
        },
        {
            bundle: "Enchanter's Bundle",
            items: [
                { name: "Oak Resin", season: "", location: "Tapped Oak Tree", status: "Incomplete" },
                { name: "Wine", season: "", location: "Keg", status: "Incomplete" },
                { name: "Rabbit's Foot", season: "", location: "Rabbits, Serpent drop in Skull Cavern (0.8%)", status: "Incomplete" },
                { name: "Pomegranate", season: "Fall", location: "Pomegranate Trees during Fall, The Farm Cave (fruit bat option)", status: "Incomplete" },
            ],
        },
    ];


    for (const bundle of BoardBundles) {
        await addBundle(bundle);
    }

    renderBundles();
}