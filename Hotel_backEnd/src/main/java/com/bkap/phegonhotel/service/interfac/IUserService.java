package com.bkap.phegonhotel.service.interfac;


import com.bkap.phegonhotel.dto.LoginRequest;
import com.bkap.phegonhotel.dto.Response;
import com.bkap.phegonhotel.model.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deteleUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);
}
