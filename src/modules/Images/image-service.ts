import { Source } from "../../interfaces.js";
import prisma from "../../prisma-client.js";

//add passcode to arguments?

export async function getImageCount() {
  try {
    const count = await prisma.image.count();
    return count;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getImagesBulk(max: number) {
  try {
    const result = await prisma.image.findMany({
      take: max,
    });
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getImageByPage(page: number) {
  try {
    const result = await prisma.image.findMany({
      skip: page * 50,
      take: 50,
      orderBy: {
        createdAt: "desc",
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

async function getImageBySource(source: Source, page: number) {
  try {
    switch (source) {
      case "REDDIT":
        const redditImages = await prisma.image.findMany({
          skip: page * 25,
          take: 25,
          where: {
            sourceName: {
              contains: "redd.it",
            },
          },
        });
        return redditImages;
      case "FOURCHAN":
        const fourchanImages = await prisma.image.findMany({
          skip: page * 25,
          take: 25,
          where: {
            sourceName: {
              contains: "i.4cdn.org",
            },
          },
        });
        return fourchanImages;
    }
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function searchImages(searchString: string) {
  try {
    const result = await prisma.image.findMany({
      //skip: page * 25, //do not use
      take: 30,
      where: {
        sourceName: {
          search: searchString,
        },
      },
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
