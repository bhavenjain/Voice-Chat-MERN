import React, { useState, useEffect } from 'react'
import Card from '../../../Components/Shared/Card/Card'
import Button from '../../../Components/Shared/Button/Button'
import Loader from '../../../Components/Shared/Loader/Loader'
import styles from './StepAvatar.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { setAvatar } from '../../../Store/activateSlice'
import { activate } from '../../../http'
import { setAuth } from '../../../Store/authSlice'

const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch()
  const { name, avatar } = useSelector(state => state.activate)
  const [image, setImage] = useState('/images/monkey-avatar.png')
  const [loading, setLoading] = useState(false)
  const [unMounted, setUnMounted] = useState(false)

  function captureImage (e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function () {
      setImage(reader.result)
      dispatch(setAvatar(reader.result))
    }
  }
  async function submit () {
    if (!name || !avatar) return
    setLoading(true)
    try {
      const { data } = await activate({ name, avatar })
      if (data.auth) {
        if (!unMounted) {
          dispatch(setAuth(data))
        }
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      setUnMounted(true)
    }
  }, [])

  if (loading) return <Loader message='Activation in progress...' />
  return (
    <div className='cardWrapper'>
      <Card title={`Okay, ${name}`} icon='monkey-emoji'>
        <p className={styles.subHeading}>How’s this photo?</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={image} alt='avatar' />
        </div>
        <div>
          <input
            onChange={captureImage}
            id='avatarInput'
            type='file'
            className={styles.avatarInput}
          />
          <label className={styles.avatarLabel} htmlFor='avatarInput'>
            Choose a different photo
          </label>
        </div>
        <div>
          <Button onClick={submit} text='Next' />
        </div>
      </Card>
    </div>
  )
}

export default StepAvatar
