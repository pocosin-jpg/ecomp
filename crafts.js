const DB_NAME = 'CraftsRoomDB';


// load the data 
async function reloadData() {
    const db = await openDB();
    const txClear = db.transaction(STORE_NAME, 'readwrite');
    txClear.objectStore(STORE_NAME).clear();
    await txClear.complete;
    db.close();

    const CraftBundles = [
        {
            bundle: "Spring Foraging Bundle",
            items: [{ name: "Wild Horseradish", season: "Spring", location: "Spring Foraging", status: "Incomplete" },
            { name: "Daffodil", season: "Spring", location: "Spring Foraging, buy from Pierre at Flower Dance", status: "Incomplete" },
            { name: "Leek", season: "Spring", location: "Spring Foraging", status: "Incomplete" },
            { name: "Dandelion", season: "Spring", location: "Spring Foraging, buy from Pierre at Flower Dance", status: "Incomplete" },
            ],
        },
        {
            bundle: "Summer Foraging Bundle",
            items: [
                { name: "Grape", season: "Summer", location: "Summer Foraging, Fall Farming", status: "Incomplete" },
                { name: "Spice Berry", season: "Summer", location: "Summer Foraging, The Farm Cave (fruit bat option)", status: "Incomplete" },
                { name: "Sweet Pea", season: "Summer", location: "Summer Foraging", status: "Incomplete" },
            ],
        },
        {
            bundle: "Fall Foraging Bundle",
            items: [
                { name: "Common Mushroom", season: "Fall", location: "Fall Foraging, Spring & Fall Foraging in the Secret Woods, The Farm Cave (mushroom option), Tapping a Mushroom Tree", status: "Incomplete" },
                { name: "Wild Plum", season: "Fall", location: "Fall Foraging, The Farm Cave (fruit bat option)", status: "Incomplete" },
                { name: "Hazlenut", season: "Fall", location: "Fall Foraging", status: "Incomplete" },
                { name: "Blackberry", season: "Fall", location: "Fall Foraging, The Farm Cave (fruit bat option)", status: "Incomplete" },
            ],
        },
        {
            bundle: "Winter Foraging Bundle",
            items: [
                { name: "Winter Root", season: "Winter", location: "Tilling soil or Artifact Spots in Winter, dropped by Blue Slimes on floors 41-79 of The Mines", status: "Incomplete" },
                { name: "Crystal Fruit", season: "Winter", location: "Winter Foraging, dropped by Dust Sprites on floors 41-79 of The Mines", status: "Incomplete" },
                { name: "Snow Yam", season: "Winter", location: "Tilling soil or Artifact Spots in Winter", status: "Incomplete" },
                { name: "Crocus", season: "Winter", location: "Winter Foraging", status: "Incomplete" },
            ],
        },
        {
            bundle: "Construction Bundle",
            items: [
                { name: "Wood (99)", season: "", location: "Chopping Trees or branches with an Axe, Carpenter's Shop", status: "Incomplete" },
                { name: "Wood (99)", season: "", location: "Chopping Trees or branches with an Axe, Carpenter's Shop", status: "Incomplete" },
                { name: "Stone (99)", season: "", location: "Smashing stones with a Pickaxe, Carpenter's Shop", status: "Incomplete" },
                { name: "Hardwood (10)", season: "", location: "Chopping Large Stumps or Large Logs with an upgraded Axe, smashing crates in The Mines, chopping Mahogany Trees", status: "Incomplete" },
            ],
        },
        {
            bundle: "Exotic Foraging Bundle (5/9)",
            items: [
                { name: "Coconut", season: "", location: "Desert Foraging, Oasis, shaking a Palm Tree in the Desert and on Ginger Island", status: "Incomplete" },
                { name: "Cactus Fruit", season: "", location: "Desert Foraging, Oasis", status: "Incomplete" },
                { name: "Cave Carrot", season: "", location: "The Mines, either smashing boxes or tilling soil", status: "Incomplete" },
                { name: "Red Mushroom", season: "", location: "Foraging in The Mines, Summer or Fall Foraging in the Secret Woods, The Farm Cave (mushroom option), Tapping a Mushroom Tree, Forest Farm Map in Fall.", status: "Incomplete" },
                { name: "Purple Mushroom", season: "", location: "The Mines, The Farm Cave (mushroom option), Forest Farm Map Foraging in Fall", status: "Incomplete" },
                { name: "Maple Syrup", season: "", location: "Tapped Maple Tree", status: "Incomplete" },
                { name: "Oak Resin", season: "", location: "Tapped Oak Tree, Haunted Skull", status: "Incomplete" },
                { name: "Pine Tar", season: "", location: "Tapped Pine Tree", status: "Incomplete" },
                { name: "Morel", season: "", location: "Foraging in the Secret Woods or Forest Farm Map in Spring, The Farm Cave (mushroom option)", status: "Incomplete" },
            ],
        }
    ];


    for (const bundle of CraftBundles) {
        await addBundle(bundle);
    }

    renderBundles();
}