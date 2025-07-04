const DB_NAME = 'PDB';


// load the data 
async function reloadData() {
    const db = await openDB();
    const txClear = db.transaction(STORE_NAME, 'readwrite');
    txClear.objectStore(STORE_NAME).clear();
    await txClear.complete;
    db.close();

    const PBundles = [
        {
            bundle: "Spring Crops Bundle",
            items: [
                { name: "Parsnip", season: "Spring", location: "Spring Crops", status: "Incomplete" },
                { name: "Green Bean", season: "Spring", location: "Spring Crops", status: "Incomplete" },
                { name: "Cauliflower", season: "Spring", location: "Spring Crops", status: "Incomplete" },
                { name: "Potato", season: "Spring", location: "Spring Crops", status: "Incomplete" },
            ],
        },
        {
            bundle: "Summer Crops Bundle",
            items: [
                { name: "Tomato", season: "Summer", location: "Summer Crops", status: "Incomplete" },
                { name: "Hot Pepper", season: "Summer", location: "Summer Crops", status: "Incomplete" },
                { name: "Blueberry", season: "Summer", location: "Summer Crops", status: "Incomplete" },
                { name: "Melon", season: "Summer", location: "Summer Crops", status: "Summer" },
            ],
        },
        {
            bundle: "Fall Crops Bundle",
            items: [
                { name: "Corn", season: "Fall", location: "Summer / Fall Crops", status: "Incomplete" },
                { name: "Eggplant", season: "Fall", location: "Fall Crops", status: "Incomplete" },
                { name: "Pumpkin", season: "Fall", location: "Fall Crops", status: "Incomplete" },
                { name: "Yam", season: "Fall", location: "Fall Crops, dropped by Duggies on floors 6-29 of The Mines (3%", status: "Incomplete" },
            ],
        },
        {
            bundle: "Quality Crops Bundle",
            items: [
                { name: "Parsnip (5)", season: "Spring", location: "Gold quality Spring Crops", status: "Incomplete" },
                { name: "Melon (5)", season: "Summer", location: "Gold quality Summer Crops", status: "Incomplete" },
                { name: "Pumpkin (5)", season: "Fall", location: "Gold quality Fall Crops", status: "Incomplete" },
                { name: "Corn (5)", season: "Summer", location: "Gold quality Summer / Fall Crops", status: "Incomplete" },
            ],
        },
        {
            bundle: "Animal Bundle",
            items: [
                { name: "Large Milk", season: "", location: "Cows", status: "Incomplete" },
                { name: "Large Egg (Brown)", season: "", location: "Brown Chickens", status: "Incomplete" },
                { name: "Large Egg", season: "", location: "White Chickens", status: "Incomplete" },
                { name: "Large Goat Milk", season: "", location: "Goats", status: "Incomplete" },
                { name: "Wool", season: "", location: "Sheep, Rabbits", status: "Incomplete" },
            ],
        },

        {
            bundle: "Artisan Bundle",
            items: [
                { name: "Truffle Oil", season: "", location: "Made from Truffles using an Oil Maker", status: "Incomplete" },
                { name: "Cloth", season: "", location: "Loom, Recycling a Soggy Newspaper, Desert Trader, dropped by Mummies in Skull Cavern", status: "Incomplete" },
                { name: "Goat Cheese", season: "", location: "Cheese Press", status: "Incomplete" },
                { name: "Cheese", season: "", location: "Cheese Press, Desert Trader", status: "Incomplete" },
                { name: "Honey", season: "", location: "Bee House, Oasis", status: "Incomplete" },
                { name: "Jelly", season: "", location: "Preserves Jar", status: "Incomplete" },
                { name: "Apple", season: "Fall", location: "Apple Trees during Fall, The Farm Cave (fruit bat option)", status: "Incomplete" },
                { name: "Apricot", season: "Spring", location: "Apricot Trees during Spring, The Farm Cave (fruit bat option)", status: "Incomplete" },
                { name: "Orange", season: "Summer", location: "Orange Trees during Summer, The Farm Cave (fruit bat option)", status: "Incomplete" },
                { name: "Peach", season: "Summer", location: "Peach Trees during Summer, The Farm Cave (fruit bat option)", status: "Incomplete" },
                { name: "Pomegranate", season: "Fall", location: "Pomegranate Trees during Fall, The Farm Cave (fruit bat option)", status: "Incomplete" },
                { name: "Cherry", season: "Spring", location: "Cherry Trees during Spring, The Farm Cave (fruit bat option)", status: "Incomplete" },
            ],
        },
    ];


    for (const bundle of PBundles) {
        await addBundle(bundle);
    }

    renderBundles();
}