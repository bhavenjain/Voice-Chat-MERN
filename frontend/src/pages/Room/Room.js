import React, { useState } from 'react'
import { useWebRtc } from '../../hooks/useWebRtc'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './Room.module.css'

const Room = () => {
  const { id: roomId } = useParams()
  const user = useSelector(state => state.auth.user)
  const { clients } = useWebRtc(roomId, user)

  return (
    <div>
      <h1>All connected clients</h1>
      {clients.map(client => {
        return (
          <div key={client.id}>
            <audio controls autoPlay></audio>
            <h4>{client.name}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default Room
