import React, { useState, useEffect } from 'react'
import RoomCard from '../../Components/RoomCard/RoomCard'
import AddRoomModal from '../../Components/AddRoomModal/AddRoomModal'
import { getRooms } from '../../http'
import styles from './Rooms.module.css'

const Rooms = () => {
  const [open, setOpen] = useState(false)
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getRooms()
        // console.log(data)
        setRooms(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetch()
  }, [])

  const showModal = () => {
    setOpen(true)
  }

  return (
    <div>
      <hr style={{ opacity: '0.1' }} />
      <div className='container'>
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All voice rooms</span>
            <div className={styles.searchBox}>
              <img src='/images/search-icon.png' alt='search' />
              <input type='text' className={styles.searchInput} name='' id='' />
            </div>
          </div>
          <div className={styles.right}>
            <button onClick={showModal} className={styles.startRoomButton}>
              <img src='/images/add-room-icon.png' alt='Add Room' />
              <span>Start a room</span>
            </button>
          </div>
        </div>

        <div className={styles.roomsList}>
          {rooms.map((room, key) => {
            return <RoomCard key={room.id} room={room} />
          })}
        </div>
      </div>

      {open && <AddRoomModal setOpen={setOpen} />}
    </div>
  )
}

export default Rooms
