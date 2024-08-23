package com.bkap.phegonhotel.utils;

import com.bkap.phegonhotel.dto.BookingDTO;
import com.bkap.phegonhotel.dto.RoomDTO;
import com.bkap.phegonhotel.dto.UserDTO;
import com.bkap.phegonhotel.model.Booking;
import com.bkap.phegonhotel.model.Room;
import com.bkap.phegonhotel.model.User;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

public class Utils {
    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLLMNQRSTUVWXYZ0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();

    public static String generateRandomConfirmationCode(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }

    //UserDTO
    public static UserDTO mapUserModelToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    public static UserDTO mapUserModelToUserDTOPlusUserBookingsAndRoom(User user) {
        UserDTO userDTO = mapUserModelToUserDTO(user);
        if (!user.getBookings().isEmpty()) {
            userDTO.setBookings(user.getBookings().stream().map(booking -> mapBookingModelToBookingDTOPlusBookedRoom(booking, false)).collect(Collectors.toList()));

        }
        return userDTO;
    }

    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(Utils::mapUserModelToUserDTO).collect(Collectors.toList());
    }

    //RoomDTO
    public static RoomDTO mapRoomModelToRoomDTO(Room room) {
        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setId(room.getId());
        roomDTO.setRoomType(room.getRoomType());
        roomDTO.setRoomPrice(room.getRoomPrice());
        roomDTO.setRoomPhotoUrl(room.getRoomPhotoUrl());
        roomDTO.setRoomDescription(room.getRoomDescription());
        return roomDTO;
    }

    public static RoomDTO mapRoomModelToRoomDTOPlusBookings(Room room) {
        RoomDTO roomDTO = mapRoomModelToRoomDTO(room);
        if (!room.getBookings().isEmpty()) {
            roomDTO.setBookings(room.getBookings().stream().map(Utils::mapBookingsModelToBookingsDTO).collect(Collectors.toList()));
        }
        return roomDTO;
    }

    public static List<RoomDTO> mapRoomListEntityToRoomListDTO(List<Room> roomList) {
        return roomList.stream().map(Utils::mapRoomModelToRoomDTO).collect(Collectors.toList());
    }

    //BookingDTO
    public static BookingDTO mapBookingsModelToBookingsDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setNumOfAdults(booking.getNumOfAdults());
        bookingDTO.setNumOfChildren(booking.getNumOfChildren());
        bookingDTO.setTotalNumOfGuest(booking.getTotalNumOfGuest());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        return bookingDTO;
    }

    public static BookingDTO mapBookingModelToBookingDTOPlusBookedRoom(Booking booking, boolean mapUser) {
        BookingDTO bookingDTO = mapBookingsModelToBookingsDTO(booking);
        if (mapUser) {
            bookingDTO.setUser(Utils.mapUserModelToUserDTO(booking.getUser()));
        }
        if (booking.getRoom() != null) {
            bookingDTO.setRoom(Utils.mapRoomModelToRoomDTO(booking.getRoom()));
        }
        return bookingDTO;
    }

    public static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookingList) {
        return bookingList.stream().map(Utils::mapBookingsModelToBookingsDTO).collect(Collectors.toList());
    }
}
