
const DB_VERSION = 1;
const STORE_NAME = 'Bundles';
// Track expanded/collapsed bundle IDs globally
const expandedBundleIds = new Set();



// setup indexdb
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function addBundle(bundle) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.add(bundle);
        req.onsuccess = () => {
            resolve();
            db.close();
        };
        req.onerror = () => {
            reject(req.error);
            db.close();
        };
    });
}

async function updateBundle(bundle) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(bundle);
        req.onsuccess = () => {
            resolve();
            db.close();
        };
        req.onerror = () => {
            reject(req.error);
            db.close();
        };
    });
}

async function getAllBundles() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();
        request.onsuccess = () => {
            resolve(request.result);
            db.close();
        };
        request.onerror = () => {
            reject(request.error);
            db.close();
        };
    });
}



// async function reloadData() is on a page specific js


// Rendering logic for bundles
async function renderBundles() {
    const container = document.getElementById('bundleContainer');

    const bundles = await getAllBundles();


    const seasonFilter = document.getElementById('seasonFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();

    const renderedIds = new Set();

    for (const bundle of bundles) {
        const filteredItems = bundle.items.filter(item => {
            const matchesSeason = !seasonFilter || item.season === seasonFilter;
            const matchesStatus = !statusFilter || item.status === statusFilter;
            const matchesSearch = !searchTerm || item.name.toLowerCase().includes(searchTerm);
            return matchesSeason && matchesStatus && matchesSearch;
        });

        if (filteredItems.length === 0) continue;

        // Progress
        const totalItems = bundle.items.length;
        const completedItems = bundle.items.filter(i => i.status === 'Complete').length;
        const progressPercent = Math.round((completedItems / totalItems) * 100);

        // Check for existing bundle div
        let bundleDiv = document.getElementById(`bundle-${bundle.id}`);
        if (!bundleDiv) {
            bundleDiv = document.createElement('div');
            bundleDiv.className = 'bundle';
            bundleDiv.id = `bundle-${bundle.id}`;
            container.appendChild(bundleDiv);
        } else {
            bundleDiv.innerHTML = ''; // Clear old content
        }


        // Header
        const header = document.createElement('div');
        header.className = 'bundle-header';
        header.title = 'Click to toggle items';

        const title = document.createElement('h2');
        title.className = 'bundle-title';
        title.textContent = `${bundle.bundle}`;


        const progressBarContainer = document.createElement('div');
        progressBarContainer.className = 'progress-bar-container';

        const progressBarFill = document.createElement('div');
        progressBarFill.className = 'progress-bar-fill';
        progressBarFill.style.width = progressPercent + '%';

        progressBarContainer.appendChild(progressBarFill);
        header.appendChild(title);
        header.appendChild(progressBarContainer);
        bundleDiv.appendChild(header);

        // Items container
        const itemsDiv = document.createElement('div');
        itemsDiv.className = 'items';

        if (expandedBundleIds.has(bundle.id)) {
            itemsDiv.style.display = 'block';
        } else {
            itemsDiv.style.display = 'none';
        }

        // Items
        for (const item of filteredItems) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item ' + (item.status.toLowerCase());
            itemDiv.dataset.bundleId = bundle.id;
            itemDiv.dataset.itemIndex = bundle.items.indexOf(item);

            const infoDiv = document.createElement('div');
            infoDiv.className = 'item-info';

            infoDiv.innerHTML = `
                <div class="item-name">${item.name}</div>
                <div>Season: ${item.season || 'Any'}</div>
                <div>Location: ${item.location || 'N/A'}</div>
            `;

            const btn = document.createElement('button');
            btn.className = 'mark-complete-btn';
            btn.textContent = item.status === 'Complete' ? 'Completed' : 'Mark Complete';
            btn.disabled = item.status === 'Complete';

            btn.addEventListener('click', () => markItemComplete(bundle.id, bundle.items.indexOf(item)));

            itemDiv.appendChild(infoDiv);
            itemDiv.appendChild(btn);
            itemsDiv.appendChild(itemDiv);
        }

        bundleDiv.appendChild(itemsDiv);

        header.addEventListener('click', () => {
            if (itemsDiv.style.display === 'none' || itemsDiv.style.display === '') {
                itemsDiv.style.display = 'block';
                expandedBundleIds.add(bundle.id);
            } else {
                itemsDiv.style.display = 'none';
                expandedBundleIds.delete(bundle.id);
            }
        });

        renderedIds.add(bundle.id);
    }

    // Remove bundles that no longer match filter
    const allBundleDivs = container.querySelectorAll('.bundle');
    allBundleDivs.forEach(div => {
        const id = parseInt(div.id.replace('bundle-', ''));
        if (!renderedIds.has(id)) {
            container.removeChild(div);
        }
    });
}




// Mark item complete
async function markItemComplete(bundleId, itemIndex) {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const getRequest = store.get(bundleId);
    getRequest.onsuccess = async () => {
        const bundle = getRequest.result;
        if (!bundle) {
            alert('Bundle not found.');
            db.close();
            return;
        }

        // Mark the selected item as Complete
        bundle.items[itemIndex].status = 'Complete';

        // Check if all items are now Complete
        const allComplete = bundle.items.every(item => item.status === 'Complete');

        const putRequest = store.put(bundle);
        putRequest.onsuccess = () => {
            // If the bundle is now fully complete, remove it from expandedBundles
            if (allComplete) {
                expandedBundleIds.delete(bundleId);
            }

            renderBundles();
            db.close();
        };
        putRequest.onerror = () => {
            alert('Failed to update bundle');
            db.close();
        };
    };
    getRequest.onerror = () => {
        alert('Failed to get bundle');
        db.close();
    };
}




// apply filters & rerender
function applyFilters() {
    renderBundles();
}

window.onload = async () => {
    const bundles = await getAllBundles();
    if (bundles.length === 0) {
        await reloadData();
    } else {
        renderBundles();
    }
};