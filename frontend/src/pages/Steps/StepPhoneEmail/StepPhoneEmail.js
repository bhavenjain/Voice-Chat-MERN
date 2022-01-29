import React, { useState } from 'react'
import Email from './Email/Email'
import Phone from './Phone/Phone'
import styles from './StepEmail.module.css'

const phoneEmailMap = {
  phone: Phone,
  email: Email
}

const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState('phone')
  const Current = phoneEmailMap[type]

  return (
    <div className={styles.container}>
      <div className={'cardWrapper'}>
        <div>
          <div className={styles.buttonWrap}>
            <button
              className={`${styles.tabButton} ${
                type === 'phone' ? styles.active : ''
              } `}
              onClick={() => setType('phone')}
            >
              <img src='/images/phone-white.png' alt='phone' />
            </button>
            <button
              className={`${styles.tabButton} ${
                type === 'email' ? styles.active : ''
              } `}
              onClick={() => setType('email')}
            >
              <img src='/images/mail-white.png' alt='email' />
            </button>
          </div>
          <Current onNext={onNext} />
        </div>
      </div>
    </div>
  )
}

export default StepPhoneEmail
