const DB_NAME = 'FishRoomDB';


// load the data 
async function reloadData() {
    const db = await openDB();
    const txClear = db.transaction(STORE_NAME, 'readwrite');
    txClear.objectStore(STORE_NAME).clear();
    await txClear.complete;
    db.close();

    const FBundles = [
        {
            bundle: "River Fish Bundle",
            items: [
                { name: "Sunfish", season: "Spring", location: "Found in Rivers, 6am – 7pm, Spring and Summer during sunny weather.", status: "Incomplete" },
                { name: "Catfish", season: "Spring", location: "Found in Rivers and Secret Woods, 6am – midnight, Spring and Fall. Only when raining.Can be found in Summer during rain in the Secret Woods and Witch's Swamp, Winter with a Rain Totem.", status: "Incomplete" },
                { name: "Shad", season: "Spring", location: "Found in Rivers, 9am – 2am, Spring, Summer, and Fall. Only when raining.", status: "Incomplete" },
                { name: "Tiger Trout", season: "Fall", location: "Found in Rivers, 6am – 7pm, Fall and Winter. Can be found in any weather.", status: "Incomplete" },
            ],
        },
        {
            bundle: "Lake Fish Bundle",
            items: [
                { name: "Largemouth Bass", season: "", location: "Found in the Mountain Lake, 6am – 7pm, All Seasons.", status: "Incomplete" },
                { name: "Carp", season: "Spring", location: "Found in the Mountain Lake, Anytime, during Spring, Summer, or Fall. Found in Secret Woods or Sewer, Anytime, All Seasons.", status: "Incomplete" },
                { name: "Bullhead", season: "", location: "Found in the Mountain Lake, Anytime, All Seasons.", status: "Incomplete" },
                { name: "Sturgeon", season: "Summer", location: "Found in the Mountain Lake, 6am – 7pm, Summer and Winter.", status: "Incomplete" },
            ],
        },
        {
            bundle: "Ocean Fish Bundle",
            items: [
                { name: "Sardine", season: "Spring", location: "Found in the Ocean, 6am – 7pm, Spring, Fall, and Winter.", status: "Incomplete" },
                { name: "Tuna", season: "Summer", location: "Found in the Ocean, 6am – 7pm, Summer and Winter.", status: "Incomplete" },
                { name: "Red Snapper", season: "Summer", location: "Found in the Ocean, 6am – 7pm, Summer and Fall. Only when raining.", status: "Incomplete" },
                { name: "Tilapia", season: "Summer", location: "Found in the Ocean, 6am – 2pm, Summer and Fall.", status: "Incomplete" },
            ],
        },
        {
            bundle: "Night Fishing Bundle",
            items: [
                { name: "Walleye", season: "Fall", location: "Found in Rivers, the Mountain Lake, and Cindersap Forest Pond, 12pm – 2am, Fall (Winter with Rain Totem.) Only when raining.", status: "Incomplete" },
                { name: "Bream", season: "", location: "Found in Rivers, 6pm – 2am, All Seasons.", status: "Incomplete" },
                { name: "Eel", season: "Spring", location: "Found in the Ocean, 4pm – 2am, Spring or Fall. Only when raining.", status: "Incomplete" },
            ],
        },
        {
            bundle: "Crab Pot Bundle",
            items: [
                { name: "Lobster", season: "", location: "Caught in Crab Pots (ocean)", status: "Incomplete" },
                { name: "Crayfish", season: "", location: "Caught in Crab Pots (freshwater)", status: "Incomplete" },
                { name: "Crab", season: "", location: "Caught in Crab Pots (ocean), drops from Rock Crabs or Lava Crabs in The Mines", status: "Incomplete" },
                { name: "Cockle", season: "", location: "Caught in Crab Pots (ocean), Beach Foraging", status: "Incomplete" },
                { name: "Mussel", season: "", location: "Caught in Crab Pots (ocean), Beach Foraging", status: "Incomplete" },
                { name: "Shrimp", season: "", location: "Caught in Crab Pots (ocean)", status: "Incomplete" },
                { name: "Snail", season: "", location: "Caught in Crab Pots (freshwater)", status: "Incomplete" },
                { name: "Periwinkle", season: "", location: "Caught in Crab Pots (freshwater)", status: "Incomplete" },
                { name: "Oyster", season: "", location: "Caught in Crab Pots (ocean), Beach Foraging", status: "Incomplete" },
                { name: "Clam", season: "", location: "Caught in Crab Pots (ocean), Beach Foraging", status: "Incomplete" },
            ],
        },

        {
            bundle: "Specialty Fish Bundle",
            items: [
                { name: "Pufferfish", season: "Summer", location: "Found in the Ocean, 12pm – 4pm, Summer during sunny weather.", status: "Incomplete" },
                { name: "Ghostfish", season: "", location: "Found in ponds in The Mines floors 20 and 60, Anytime, All Seasons. May also be dropped by Ghosts.", status: "Incomplete" },
                { name: "Sandfish", season: "", location: "Found in the pond in The Desert, 6am – 8pm, All Seasons.", status: "Incomplete" },
                { name: "Woodskip", season: "", location: "Found in the Secret Woods and the Forest Farm, Anytime, All Seasons.", status: "Incomplete" },
            ],
        },
    ];


    for (const bundle of FBundles) {
        await addBundle(bundle);
    }

    renderBundles();
}