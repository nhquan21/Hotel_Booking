package com.bkap.phegonhotel.service.interfac;

import com.bkap.phegonhotel.dto.Response;
import com.bkap.phegonhotel.model.Booking;

public interface IBookingService {
    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);
}
