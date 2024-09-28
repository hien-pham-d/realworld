import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const defaultAuthor = await prisma.author.create({
    data: {
      id: 1,
      username: 'default',
      bio: 'I am the default user of this site',
      image: 'this should be an image',
      articles: {
        create: [
          {
            title: 'Title: test article of the default author',
            description: 'Description 1.',
            body: 'Body 1.',
            tags: {
              create: [
                {
                  tag: {
                    create: {
                      name: 'tag1',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.author.create({
    data: {
      username: 'authorA',
      bio: 'I am a user of this site',
      image: 'this should be an image',
      articles: {
        create: [
          {
            title: 'Title: test article of authorA',
            description: 'Description 2.',
            body: 'Body 2.',
            tags: {
              create: [
                {
                  tag: {
                    create: {
                      name: 'tag2',
                    },
                  },
                },
              ],
            },
          },
          {
            title:
              'Title: one more article of authorA that is favorited by the default author',
            description: 'Description 3.',
            body: 'Body 3.',
            tags: {
              create: [
                {
                  tag: {
                    create: {
                      name: 'tag3',
                    },
                  },
                },
              ],
            },
            favoritedBy: {
              create: [
                {
                  favoritedById: defaultAuthor.id,
                },
              ],
            },
          },
        ],
      },
    },
  });
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
