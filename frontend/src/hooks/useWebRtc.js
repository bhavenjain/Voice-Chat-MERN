import { useRef, useState } from 'react'
import { useStateWithCallback } from './useStateWithCallback'

const users = [
  {
    id: 1,
    name: 'Bhaven Jain'
  },
  {
    id: 2,
    name: 'John Doe'
  }
]

export const useWebRtc = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback(users)
  const audioElements = useRef({})
  const connections = useRef({})
  const localMediaStream = useRef(null)

  return { clients }
}
