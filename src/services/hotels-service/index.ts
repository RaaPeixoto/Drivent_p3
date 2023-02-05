import { notFoundError, paymentRequiredError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelsRepository from "@/repositories/hotels-repository";
import ticketRepository from "@/repositories/ticket-repository";
export async function checkEnrollmentService(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }

  if (!ticket.TicketType.includesHotel || ticket.status !== "PAID" || ticket.TicketType.isRemote) {
    throw paymentRequiredError();
  }
}

export async function getAllHotelsService() {
  return await hotelsRepository.findAllHotels();
}

export async function getHotelService(hotelId: number) {
  const hotel = await hotelsRepository.findHotelById(hotelId);
  if (!hotel) {
    throw notFoundError();
  }
  return hotel;
}
