package com.bkap.phegonhotel.service.interfac;

import com.bkap.phegonhotel.dto.Response;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IRoomService {
    Response addNewRoom(String typeRoom, MultipartFile photo, String description, BigDecimal roomPrice);

    List<String> getAllRoomType();

    Response getAllRooms();

    Response deleteRoom(Long roomId);

    Response updateRoom(Long roomId, String description, String typeRoom, BigDecimal price, MultipartFile photo);

    Response getRoomById(Long roomId);

    Response getAvailableRoomByDateAngType(LocalDate checkInDate, LocalDate checkoutDate, String roomType);

    Response getAvailableRooms();

}
