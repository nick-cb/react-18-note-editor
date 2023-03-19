import { PrismaClient } from "@prisma/client";
import { startOfYear } from "date-fns";
const prisma = new PrismaClient();

const now = new Date();
const startOfThisYear = startOfYear(now);
function randomDateBetween(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

async function main() {
  await prisma.notes.createMany({
    data: [
      {
        title: "Meeting Notes",
        body: "This is an example note. It contains **Markdown**!",
        created_at: randomDateBetween(startOfThisYear, now),
        updated_at: randomDateBetween(startOfThisYear, now),
      },
      {
        title: "Make a thing",
        body: `It's very easy to make some words **bold** and other words *italic* with
Markdown. You can even [link to React's website!](https://www.reactjs.org).`,
        created_at: randomDateBetween(startOfThisYear, now),
        updated_at: randomDateBetween(startOfThisYear, now),
      },
      {
        title:
          "A note with a very long title because sometimes you need more words",
        body: `You can write all kinds of [amazing](https://en.wikipedia.org/wiki/The_Amazing)
notes in this app! These note live on the server in the \`notes\` folder.

![This app is powered by React](https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/React_Native_Logo.png/800px-React_Native_Logo.png)`,
        created_at: randomDateBetween(startOfThisYear, now),
        updated_at: randomDateBetween(startOfThisYear, now),
      },
      {
        title: "I wrote this note today",
        body: "It was an excellent note.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
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
