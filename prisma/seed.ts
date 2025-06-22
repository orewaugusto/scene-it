import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Optional: Clean up existing mock movies if you want fresh data every time
  // Be cautious with this in production environments!
  await prisma.movie.deleteMany({
    where: {
      title: {
        contains: "Mock Movie Title",
      },
    },
  });
  console.log("Cleared existing mock movies.");

  const moviesData: Prisma.MovieCreateInput[] = [];

  for (let i = 1; i <= 50; i++) {
    moviesData.push({
      title: `Mock Movie Title ${i}`,
      description: `This is a mock description for movie number ${i}. It's a great film!`,
      releaseYear: 2000 + (i % 20),
      posterUrl: `https://placehold.co/200x300/F0F0F0/000000?text=Movie+${i}`,
    });
  }

  await prisma.$transaction(
    moviesData.map((movie) => prisma.movie.create({ data: movie })),
  );

  console.log("Successfully seeded 50 mock movies.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
