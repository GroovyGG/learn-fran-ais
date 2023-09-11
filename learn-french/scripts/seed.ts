const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                {name: "French"},   
                {name: "Spanish"},
                {name: "Japanese"},
                {name: "Chinese"},
            ],
        });
    } catch (error) {
        console.error("Error seeding default categories",error);
    } finally {
        await db.$disconnect();
    }
}

main();
