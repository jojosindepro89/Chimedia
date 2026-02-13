const http = require('http');

const routes = [
    '/',
    '/shop',
    '/news',
    '/predictions',
    '/live-scores',
    '/contact',
    '/about', // implied
    '/login',
    '/register',
    '/dashboard',
    '/dashboard/subscription',
    '/dashboard/orders',
    '/dashboard/settings',
    '/dashboard/profile',
    '/dashboard/messages',
    '/cart',
    '/admin/login',
    // Test edit routes with a placeholder ID (this will likely 404 if ID doesn't exist, but checking route structure)
    // We can't easily guess a valid ID without fetching from DB, so we might skip specific ID checks or mock them
];

async function checkRoute(route) {
    return new Promise((resolve) => {
        http.get(`http://localhost:3000${route}`, (res) => {
            if (res.statusCode === 404) {
                console.error(`❌ 404 Not Found: ${route}`);
                resolve(false);
            } else if (res.statusCode === 200) {
                console.log(`✅ 200 OK: ${route}`);
                resolve(true);
            } else {
                console.warn(`⚠️ ${res.statusCode}: ${route}`);
                resolve(true); // Treat as OK for now, unless 404
            }
        }).on('error', (e) => {
            console.error(`❌ Error connecting to ${route}: ${e.message}`);
            resolve(false);
        });
    });
}

async function main() {
    console.log('Starting 404 Scan...');
    for (const route of routes) {
        await checkRoute(route);
    }
    console.log('Scan Complete.');
}

main();
