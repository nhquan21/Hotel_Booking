package com.bkap.phegonhotel.repo;

import com.bkap.phegonhotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;


public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT DISTINCT r.roomType From Room r")
    List<String> findDistinctRoomTypes();

    //Lấy ra danh sách theo ngày đặt đến ngày rả phòng;
    @Query("SELECT r FROM Room r WHERE r.roomType LIKE %:roomType% AND r.id NOT IN (SELECT bk.room.id FROM Booking bk WHERE" +
            "(bk.checkInDate <= :checkOutDate) AND (bk.checkOutDate >= :checkInDate))")
    List<Room> findAvailableRoomsByDatesAndTypes(LocalDate checkInDate, LocalDate checkOutDate, String roomType);

    //Lấy danh sách tất cả ca phòng chưa đặt
    @Query("SELECT r From Room r WHERE r.id NOT IN (SELECT b.id From Booking b)")
    List<Room> getAllAvailadleRooms();
}
