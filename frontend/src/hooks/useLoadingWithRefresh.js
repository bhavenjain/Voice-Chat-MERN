import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAuth } from '../Store/authSlice'
import axios from 'axios'

export function useLoadingWithRefresh () {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const request = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/refresh`,
          {
            withCredentials: true
          }
        )
        dispatch(setAuth(data))
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    request()
  }, [dispatch])

  return { loading }
}
