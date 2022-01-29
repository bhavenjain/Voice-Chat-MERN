import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.css'
import { logout } from '../../../http'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../../Store/authSlice'

const Navigation = () => {
  const dispatch = useDispatch()
  const { isAuth, user } = useSelector(state => state.auth)
  const logoutUser = async () => {
    try {
      const { data } = await logout()
      dispatch(setAuth(data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className={`container ${styles.navbar}`}>
      <Link className={styles.link} to='/'>
        <img src='/images/logo.png' alt='logo' />
        <span className={styles.span}>CodersHouse</span>
      </Link>

      {isAuth && (
        <div className={styles.navRight}>
          <h3 className={styles.name}>{user.name}</h3>
          <Link to='/'>
            <img
              className={styles.avatar}
              src={user.avatar ? user.avatar : '/images/monkey-avatar.png'}
              width='40'
              height='40'
              alt='avatar'
            />
          </Link>
          <button className={styles.logoutButton} onClick={logoutUser}>
            <img src='/images/logout.png' alt='Logout' />
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navigation
