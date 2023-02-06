import { Source } from "../../interfaces.js";
import prisma from "../../prisma-client.js";

//add passcode to arguments?

async function getImageCount() {
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
      skip: page * 25,
      take: 25,
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
            source: {
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
            source: {
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
        name: {
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

function updatePallet(id: number, pallet: string) {}
