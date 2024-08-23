package com.bkap.phegonhotel.service.impl;

import com.bkap.phegonhotel.dto.Response;
import com.bkap.phegonhotel.dto.RoomDTO;
import com.bkap.phegonhotel.exception.OurException;
import com.bkap.phegonhotel.model.Room;
import com.bkap.phegonhotel.repo.BookingRepository;
import com.bkap.phegonhotel.repo.RoomRepository;
import com.bkap.phegonhotel.service.AwsS3Service;
import com.bkap.phegonhotel.service.interfac.IRoomService;
import com.bkap.phegonhotel.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class RoomService implements IRoomService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private AwsS3Service awsS3Service;

    @Override
    public Response addNewRoom(String typeRoom, MultipartFile photo, String description, BigDecimal roomPrice) {
        Response response = new Response();
        try {
            if (typeRoom == null || typeRoom.isEmpty()) {
                throw new IllegalArgumentException("Room type is required.");
            }
            if (photo == null || photo.isEmpty()) {
                throw new IllegalArgumentException("Photo is required.");
            }
            if (description == null || description.isEmpty()) {
                throw new IllegalArgumentException("Description is required.");
            }
            if (roomPrice == null || roomPrice.compareTo(BigDecimal.ZERO) <= 0) {
                throw new IllegalArgumentException("Room price must be greater than zero.");
            }

            // Lưu ảnh lên S3 và nhận về URL
            String imageUrl = awsS3Service.saveImageToS3(photo);

            // Tạo đối tượng Room và lưu vào cơ sở dữ liệu
            Room room = new Room();
            room.setRoomPhotoUrl(imageUrl);
            room.setRoomType(typeRoom);
            room.setRoomPrice(roomPrice);
            room.setRoomDescription(description);
            Room savedRoom = roomRepository.save(room);

            // Chuyển đổi Room thành RoomDTO
            RoomDTO roomDTO = Utils.mapRoomModelToRoomDTO(savedRoom);

            // Đặt trạng thái phản hồi
            response.setStatusCode(200);
            response.setMessage("Room created successfully");
            response.setRoom(roomDTO);

        } catch (IllegalArgumentException e) {
            response.setStatusCode(400);  // Lỗi đầu vào không hợp lệ
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);  // Lỗi máy chủ
            response.setMessage("An error occurred while creating the room.");
        }
        return response;
    }

    @Override
    public List<String> getAllRoomType() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public Response getAllRooms() {
        Response response = new Response();
        try {
            List<Room> roomList = roomRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<RoomDTO> roomDTO = Utils.mapRoomListEntityToRoomListDTO(roomList);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setRoomList(roomDTO);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteRoom(Long roomId) {
        Response response = new Response();
        try {
            roomRepository.findById(Long.valueOf(roomId)).orElseThrow(() -> new OurException("Room not found"));
            roomRepository.deleteById(roomId);
            response.setStatusCode(200);
            response.setMessage("Successful");
        } catch (OurException e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error delete a room");
        }
        return response;
    }

    @Override
    public Response updateRoom(Long roomId, String description, String typeRoom, BigDecimal price, MultipartFile photo) {
        Response response = new Response();
        try {
            String imageUrl = null;
            Room room = roomRepository.findById(Long.valueOf(roomId)).orElseThrow(() -> new OurException("Id not found"));
            if (photo != null || !photo.isEmpty()) imageUrl = awsS3Service.saveImageToS3(photo);
            if (typeRoom != null) room.setRoomType(typeRoom);
            if (price != null) room.setRoomPrice(price);
            if (description != null) room.setRoomDescription(description);
            if (imageUrl != null) room.setRoomPhotoUrl(imageUrl);

            Room savedRoom = roomRepository.save(room);
            RoomDTO roomDTO = Utils.mapRoomModelToRoomDTO(savedRoom);
            response.setRoom(roomDTO);
            response.setStatusCode(200);
            response.setMessage("Successful");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    @Override
    public Response getRoomById(Long roomId) {
        Response response = new Response();
        try {
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new OurException("Room not found"));
            RoomDTO roomDTO = Utils.mapRoomModelToRoomDTOPlusBookings(room);
            response.setRoom(roomDTO);
            response.setStatusCode(200);
            response.setMessage("Successful");
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAvailableRoomByDateAngType(LocalDate checkInDate, LocalDate checkoutDate, String roomType) {
        Response response = new Response();
        try {
            List<Room> roomList = roomRepository.findAvailableRoomsByDatesAndTypes(checkInDate, checkoutDate, roomType);
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);
            response.setRoomList(roomDTOList);
            response.setStatusCode(200);
            response.setMessage("Successful");
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAvailableRooms() {
        Response response = new Response();
        try {
            List<Room> roomList = roomRepository.getAllAvailadleRooms();
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);
            response.setRoomList(roomDTOList);
            response.setStatusCode(200);
            response.setMessage("Successful");
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }
}
