const https = require('https');
const fs = require('fs');
const path = require('path');

// Load env (simple parser)
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.join('=').trim().replace(/^["']|["']$/g, '');
    }
});

const PAYSTACK_SECRET_KEY = env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
    console.error("❌ PAYSTACK_SECRET_KEY not found in .env");
    process.exit(1);
}

console.log("Found Secret Key:", PAYSTACK_SECRET_KEY.substring(0, 10) + "...");

const params = JSON.stringify({
    email: "test@example.com",
    amount: 5000 * 100, // 5000 Naira
    callback_url: "http://localhost:3000/payment/callback"
});

const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, res => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        try {
            const body = JSON.parse(data);
            console.log("Response Body:", JSON.stringify(body, null, 2));
            if (body.status) {
                console.log("✅ Paystack API connection successful!");
            } else {
                console.error("❌ Paystack API returned error:", body.message);
            }
        } catch (e) {
            console.error("Failed to parse response:", data);
        }
    });
});

req.on('error', error => {
    console.error("Request Error:", error);
});

req.write(params);
req.end();
