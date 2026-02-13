const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const EXCHANGE_RATE = 1395; // 1 USD = 1395 NGN (As per user request)

const products = [
    {
        name: "20W USB & USB-C Fast Power Adapter",
        priceUsd: 10.00,
        category: "Accessories",
        description: "Compact & Reliable. Supports fast and stable charging for smartphones, earbuds, and accessories.",
        imageUrl: "https://chigoexpress.com/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-15-at-16.49.54-3-410x492.jpeg"
    },
    {
        name: "25W USB-C Fast Power Adapter & Lightning Cable Kit",
        priceUsd: 15.00,
        category: "Accessories",
        description: "High-Speed Charging for iPhone. Complete kit.",
        imageUrl: "https://chigoexpress.com/wp-content/uploads/2026/01/unnamed-8-384x492.jpg"
    },
    {
        name: "50W Dual Port USB-C Fast Charger & Lightning Cable Kit",
        priceUsd: 10.00, // Corrected from source
        category: "Accessories",
        description: "For iPhone 14 Pro Max & More. Dual port for charging multiple devices.",
        imageUrl: "https://chigoexpress.com/wp-content/uploads/2026/01/unnamed-5-384x492.jpg"
    },
    {
        name: "5A Type-C Super Fast Charging Cable",
        priceUsd: 10.00, // Corrected from source
        category: "Accessories",
        description: "High-Speed & Durable. 5A current support.",
        imageUrl: "https://chigoexpress.com/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-15-at-16.49.54-1-410x492.jpeg"
    },
    {
        name: "65W Fast Charging Data Cable with Digital Power Display",
        priceUsd: 24.00, // Corrected from source
        category: "Accessories",
        description: "See the power flow with digital display.",
        imageUrl: "https://chigoexpress.com/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-15-at-16.49.54-410x492.jpeg"
    },
    {
        name: "65W GaN Fast Charging Power Adapter (USB-A + USB-C)",
        priceUsd: 11.00, // Corrected from source
        category: "Accessories",
        description: "GaN technology for cooler, faster charging. USB-A + USB-C.",
        imageUrl: "https://chigoexpress.com/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-15-at-16.52.28-410x492.jpeg"
    },
    {
        name: "AIMB G1 AI Smart Glasses",
        priceUsd: 100.00, // Corrected from source
        category: "Gadgets",
        description: "With 5MP Camera, ChatGPT Integration & Interchangeable Lenses.",
        imageUrl: "https://chigoexpress.com/wp-content/uploads/2026/01/unnamed-13-384x492.jpg"
    },
    {
        name: "Heavy-Duty 3-in-1 Nylon Braided Fast Charging Cable (Purple)",
        priceUsd: 12.00, // Corrected from source
        category: "Accessories",
        description: "Purple. Universal Compatibility.",
        imageUrl: "https://chigoexpress.com/wp-content/uploads/2026/01/unnamed-14-384x492.jpg"
    },
    {
        name: "iPhone X USB Power Adapter & Lightning Cable Kit",
        priceUsd: 15.00, // Corrected from source
        category: "Accessories",
        description: "Complete Charging Set.",
        imageUrl: "https://chigoexpress.com/wp-content/uploads/2026/01/unnamed-7-384x492.jpg"
    },
    {
        name: "Jellico C33 Smart Charger 2.4A",
        priceUsd: 5.00, // Estimated (source incomplete)
        category: "Accessories",
        description: "Single Port USB Fast Charging Adapter (Black).",
        imageUrl: "https://chigoexpress.com/wp-content/uploads/2026/01/unnamed-9-384x492.jpg"
    },
    {
        name: "L9WIFI Portable Body Camera",
        priceUsd: 45.00, // Estimated (source incomplete)
        category: "Gadgets",
        description: "1080P Video Recorder with WiFi & Screen.",
        imageUrl: "https://chigoexpress.com/wp-content/uploads/2026/01/unnamed-11-384x492.jpg" // Guessing filename sequence or similar
    },
    {
        name: "Portable WiFi Body Camera with LCD Screen",
        priceUsd: 50.00,
        category: "Gadgets",
        description: "Complete Kit with Accessories.",
        imageUrl: "https://chigoexpress.com/wp-content/uploads/2026/01/unnamed-10-384x492.jpg"
    },
    {
        name: "Premium Metallic Red Cylinder TWS Bluetooth Earbuds",
        priceUsd: 30.00,
        category: "Audio",
        description: "Model S7. Sliding Charging Case.",
        imageUrl: "https://chigoexpress.com/wp-content/uploads/2026/01/unnamed-3-384x492.jpg"
    },
    {
        name: "Premium Rose Gold Slide-Out TWS Bluetooth Earbuds",
        priceUsd: 30.00,
        category: "Audio",
        description: "HD Sound & Touch Control.",
        imageUrl: "https://chigoexpress.com/wp-content/uploads/2026/01/unnamed-2-384x492.jpg"
    },
    {
        name: "Samsung 25W PD Adapter",
        priceUsd: 15.00,
        category: "Accessories",
        description: "Super Fast Charging Kit with USB-C to USB-C Cable (Black).",
        imageUrl: "https://chigoexpress.com/wp-content/uploads/2026/01/unnamed-6-384x492.jpg"
    }
];

async function main() {
    console.log(`Seeding ChigoExpress products (Rate: ${EXCHANGE_RATE} NGN/USD)...`);

    for (const p of products) {
        const priceNgn = p.priceUsd * EXCHANGE_RATE;

        // Find existing product by name
        const existingProduct = await prisma.product.findFirst({
            where: { name: p.name }
        });

        if (existingProduct) {
            // Update
            await prisma.product.update({
                where: { id: existingProduct.id },
                data: {
                    description: p.description,
                    price: priceNgn,
                    imageUrl: p.imageUrl,
                    category: p.category,
                }
            });
            console.log(`✅ Updated: ${p.name} - ₦${priceNgn.toLocaleString()} - Img: ${p.imageUrl.substring(0, 30)}...`);
        } else {
            // Create
            await prisma.product.create({
                data: {
                    name: p.name,
                    description: p.description,
                    price: priceNgn,
                    stock: 50, // Default stock
                    category: p.category,
                    imageUrl: p.imageUrl,
                }
            });
            console.log(`✅ Created: ${p.name} - ₦${priceNgn.toLocaleString()} - Img: ${p.imageUrl.substring(0, 30)}...`);
        }
    }
    console.log("Seeding complete.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
