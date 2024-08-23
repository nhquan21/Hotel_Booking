import React, { useEffect, useState } from 'react'
import ApiServices from '../../service/ApiServices';
import RoomResult from '../comp/common/RoomResult';
import RoomSearch from '../comp/common/RoomSearch';
import Pagination from '../comp/common/Pagination';
import Navbar from '../comp/common/Navbar'

import Footer from '../comp/common/Footer'

const AllRoomsPage = () => {
    const [rooms, setRooms] = useState([])
    const [filteredRooms, setFilteredRooms] = useState([])
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setselectedRoomType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(5);

    const handleSearchResult = (result) => {
        setRooms(result);
        setFilteredRooms(result);
    }

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await ApiServices.getRoomAll();
                const allRooms = response.roomList;
                setRooms(allRooms.roomList);
                setFilteredRooms(allRooms);
            } catch (error) {
                console.error('Error fetching rooms:', error.message);
            }
        };

        const fetchRoomTypes = async () => {
            try {
                const response = await ApiServices.getRoomTypes();
                setRoomTypes(response);
            } catch (error) {
                console.error('Error fetching rooms:', error.message);
            }
        };
        fetchRooms();
        fetchRoomTypes();
    }, []);

    const handleRoomTypeChange = (e) => {
        setselectedRoomType(e.target.value);
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
    // Pagination
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div>


            <div className='all-rooms'>
                <h2>All Rooms</h2>
                <div className='all-room-filter-div'>
                    <label>Filter by Room Type:</label>
                    <select value={selectedRoomType} onChange={handleRoomTypeChange}>
                        <option value="">All</option>
                        {roomTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <RoomSearch handleSearchResult={handleSearchResult} />
                <RoomResult roomSearchResults={currentRooms} />

                <Pagination
                    roomsPerPage={roomsPerPage}
                    totalRooms={filteredRooms.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>

        </div>
    );
};


export default AllRoomsPage