import axios from "axios";

export default class ApiServices {
    static BASE_URL = "http://localhost:8080";

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Context-Type": "application/json"
        };
    }
    //AUTH
    //register
    static async registerUser(registration) {
        const respose = await axios.post(`${this.BASE_URL}/auth/register`, registration)
        return respose.data;
    }
    //login
    static async loginUser(loginDetail) {
        const respose = await axios.post(`${this.BASE_URL}/auth/login`, loginDetail)
        return respose.data;
    }

    //USERS
    static async getAll() {
        const respose = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        })
        return respose.data;
    }

    static async getUserProfile() {
        const respose = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader()
        })
        return respose.data;
    }

    static async getUserById(userId) {
        const respose = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader()
        })
        return respose.data;
    }
    static async deleteUserById(userId) {
        const respose = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader()
        })
        return respose.data;
    }
    static async getUserBookingHistory(userId) {
        const respose = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`, {
            headers: this.getHeader()
        })
        return respose.data;
    }
    //ROOM
    static async add(fromData) {
        const result = await axios.post(`${this.BASE_URL}/rooms/add`, fromData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        })
        return result.data;
    }
    static async getAvailableRooms() {
        const result = await axios.get(`${this.BASE_URL}/rooms/all-available-room`)
        return result.data;
    }
    static async getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType) {
        const result = await axios.get(`${this.BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
        return result.data;
    }
    static async getRoomTypes() {
        const response = await axios.get(`${this.BASE_URL}/rooms/types`)
        return response.data;
    }
    static async getRoomById(roomId) {
        const result = await axios.get(`${this.BASE_URL}/rooms/room-by-id/${roomId}`)
        return result.data;
    }
    static async getRoomAll() {
        const result = await axios.get(`${this.BASE_URL}/rooms/all`)
        return result.data;
    }
    static async deleteRooms(roomId) {
        const result = await axios.get(`${this.BASE_URL}/rooms/delete/${roomId}`)
        return result.data;
    }
    static async updateRoom(roomId, formData) {
        const result = await axios.get(`${this.BASE_URL}/rooms/update/${roomId}`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        })
        return result.data;
    }
    //BOOKING
    static async bookRoom(roomId, userId, booking) {
        console.log("User Id is: " + userId)
        const result = await axios.get(`${this.BASE_URL}/bookings/book-room/${roomId}/${userId}`, booking, {
            headers: {
                ...this.getHeader()
            }
        })
        return result.data;
    }
    static async getAllBooking() {
        const result = await axios.get(`${this.BASE_URL}/bookings/all`, {
            headers: this.getHeader()
        })
        return result.data;
    }
    static async getBookingConfirmationCode(confirmationCode) {
        const result = await axios.get(`${this.BASE_URL}/bookings/get-by-confirmation-code/${confirmationCode}`)
        return result.data;
    }
    static async cancelBooking(bookingId) {
        const result = await axios.get(`${this.BASE_URL}/bookings/cancel/${bookingId}`, {
            headers: {
                ...this.getHeader()
            }
        })
        return result.data;
    }
    //AUTHENTICATION CHECKKED
    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }
    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }
    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }
    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    }
}
