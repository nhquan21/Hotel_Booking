import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiServices from '../../service/ApiServices';
import Pagination from '../comp/common/Pagination';
import RoomResult from '../comp/common/RoomResult';

const ManageRoomPage = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await ApiServices.getRoomAll();
                setRooms(response.roomList);
                setFilteredRooms(response.roomList);
            } catch (err) {

            }
        }
        const fetchRoomTypes = async () => {
            try {
                const types = await ApiServices.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error('Error fetch room types:', error.message);
            }
        }
        fetchRooms();
        fetchRoomTypes();
    }, []);
    const handleRoomTypeChange = (e) => {
        setSelectedRoomType(e.target.value);
        filterRooms(e.target.value);
    }
    const filterRooms = (type) => {
        if (type === '') {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === type);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    }
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className='all-rooms'>
            <h2>All Rooms</h2>
            <div className='all-room-filter-div' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className='filter-select-div'>
                    <label>Filter by Room Type:</label>
                    <select value={selectedRoomType} onChange={handleRoomTypeChange}>
                        <option value="">All</option>
                        {roomTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <button className='add-room-button' onClick={() => navigate('/admin/add-room')}>
                        Add Room
                    </button>
                </div>
            </div>

            <RoomResult roomSearchResults={currentRooms} />

            <Pagination
                roomsPerPage={roomsPerPage}
                totalRooms={filteredRooms.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};


export default ManageRoomPage