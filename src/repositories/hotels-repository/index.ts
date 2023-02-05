import { prisma } from "@/config";
import { Hotel, Room } from "@prisma/client";

async function findAllHotels(): Promise<Hotel[]> {
  return await prisma.hotel.findMany({});
}
async function findHotelById(hotelId: number): Promise<
  Hotel & {
    Rooms: Room[];
  }
> {
  return await prisma.hotel.findFirst({
    where: { id: hotelId },
    include: {
      Rooms: true,
    },
  });
}

const hotelsRepository = {
  findAllHotels,
  findHotelById,
};

export default hotelsRepository;
