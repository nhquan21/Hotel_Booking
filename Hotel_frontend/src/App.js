import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './components/home/HomePage';
import AllRoomsPage from './components/booking_rooms/AllRoomsPage';
import FindBookingPage from './components/booking_rooms/FindBookingPage';
import RoomDetailsPage from './components/booking_rooms/RoomDetailsPage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ProfilePage from './components/profile/ProfilePage';
import EditProfilePage from './components/profile/EditProfilePage';
import Navbar from './components/comp/common/Navbar';
import Footer from './components/comp/common/Footer';
import { ProtectedRoute, AdminRoute } from './service/guard';
import AddRoomPage from './components/admin/AddRoomPage';
import ManageBookingPage from './components/admin/ManageBookingsPage';
import ManageRoomPage from './components/admin/ManageRoomPage';
import AdminPage from './components/admin/AdminPage';
import EditRoomPage from './components/admin/EditRoomPage';
import EditBookingPage from './components/admin/EditBookingPage';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className='content'>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/home' element={<HomePage />} />
            <Route exact path='/rooms' element={<AllRoomsPage />} />
            <Route exact path='/find-booking' element={<FindBookingPage />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />

            {/* Authenticated users routes */}
            <Route exact path='/room-details-book/:roomId' element={<ProtectedRoute element={<RoomDetailsPage />} />} />
            <Route exact path='/profile' element={<ProtectedRoute element={<ProfilePage />} />} />
            <Route exact path='/edit-profile' element={<ProtectedRoute element={<EditProfilePage />} />} />
            {/* Admin Auth router */}
            <Route exact path='/admin' element={<AdminRoute element={<AdminPage />} />} />
            <Route exact path='/admin/manage-rooms' element={<AdminRoute element={<ManageRoomPage />} />} />
            <Route exact path='/admin/manage-bookings' element={<AdminRoute element={<ManageBookingPage />} />} />
            <Route exact path='/admin/add-room' element={<AdminRoute element={<AddRoomPage />} />} />
            <Route exact path='/admin/edit-room/:roomId' element={<AdminRoute element={<EditRoomPage />} />} />
            <Route exact path='/admin/edit-booking/:bookingCode' element={<AdminRoute element={<EditBookingPage />} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
