import React, { useState } from 'react'
import TextInput from '../Shared/TextInput/TextInput'
import { createRoomApi as create } from '../../http'
import { useHistory } from 'react-router-dom'
import styles from './AddRoom.module.css'

const AddRoomModal = ({ setOpen }) => {
  const history = useHistory()
  const [roomType, setRoomType] = useState('open')
  const [topic, setTopic] = useState('')

  // Call the create room route
  const createRoom = async () => {
    try {
      if (!topic) {
        return
      }
      const { data } = await create({
        topic,
        roomType
      })
      history.push(`/room/${data.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button onClick={() => setOpen(false)} className={styles.closeButton}>
          <img src='/images/close.png' alt='close' />
        </button>

        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be discussed</h3>
          <TextInput
            fullwidth='true'
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder='Enter Topic'
          />

          <h2 className={styles.subHeading}>Room Types</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType('open')}
              className={`${styles.typeBox} ${
                roomType === 'open' ? styles.active : ''
              }`}
            >
              <img src='/images/globe.png' alt='' />
              <span>Open</span>
            </div>
            <div
              onClick={() => setRoomType('social')}
              className={`${styles.typeBox} ${
                roomType === 'social' ? styles.active : ''
              } `}
            >
              <img src='/images/social.png' alt='' />
              <span>Social</span>
            </div>
            <div
              onClick={() => setRoomType('private')}
              className={`${styles.typeBox} ${
                roomType === 'private' ? styles.active : ''
              } `}
            >
              <img src='/images/lock.png' alt='' />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to anyone</h2>
          <button onClick={createRoom}>
            <img src='/images/celebration.png' alt='celebration' />
            Let's Go
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddRoomModal
