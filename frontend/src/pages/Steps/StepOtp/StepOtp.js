import React, { useState } from 'react'
import Button from '../../../Components/Shared/Button/Button'
import Card from '../../../Components/Shared/Card/Card'
import TextInput from '../../../Components/Shared/TextInput/TextInput'
import styles from './StepOtp.module.css'
import { verifyOtp } from '../../../http'
import { useSelector, useDispatch } from 'react-redux'
import { setAuth } from '../../../Store/authSlice'

const StepOtp = () => {
  const [otp, setOtp] = useState('')
  const dispatch = useDispatch()
  const { phone, hash } = useSelector(state => state.auth.otp)
  const submit = async () => {
    if (!otp || !phone || !hash) {
      return
    }
    try {
      const { data } = await verifyOtp({
        phone,
        hash,
        otp
      })
      console.log(data)
      dispatch(setAuth(data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={'cardWrapper'}>
      <Card title='Enter OTP' logo='lock-emoji'>
        <TextInput value={otp} onChange={e => setOtp(e.target.value)} />
        <div className={styles.center}>
          <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text='Next' />
          </div>
          <p className={styles.bottomParagraph}>
            By entering the number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </div>
      </Card>
    </div>
  )
}

export default StepOtp
