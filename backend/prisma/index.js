import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

// check for database connection using prisma
async function connectToDatabase() {
     try {
       await prisma.$connect();
       console.log("Connected to the database");
     } catch (e) {
       console.error("Database connection failed\n", e);
     } finally {
       await prisma.$disconnect();
     }
   }
   
   connectToDatabase();

export default prisma;
