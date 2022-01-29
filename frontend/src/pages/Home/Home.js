import React from 'react'
import { useHistory } from 'react-router-dom'
import Card from '../../Components/Shared/Card/Card'
import Button from '../../Components/Shared/Button/Button'
import styles from './Home.module.css'

const Home = () => {
  const history = useHistory()

  const startRegister = event => {
    history.push('/authenticate')
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title='Welcome to Voice Chat!' logo='logo'>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <div>
          <Button onClick={startRegister} text="Let's Go" />
        </div>
      </Card>
    </div>
  )
}

export default Home
