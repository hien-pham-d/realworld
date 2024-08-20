import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const defaultAuthor = await prisma.author.create({
    data: {
      username: 'default-author',
      bio: 'I am the default user of this site',
      image: 'TODO: this should be an image',
      articles: {
        create: [
          {
            title: 'Title 1',
            description: 'Description 1.',
            body: 'Body 1.',
          },
          {
            title: 'Title 2',
            description: 'Description 2.',
            body: 'Body 2.',
          },
          {
            title: 'Title 3',
            description: 'Description 3.',
            body: 'Body 3.',
          },
        ],
      },
    },
  });
  console.log({ defaultAuthor });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
