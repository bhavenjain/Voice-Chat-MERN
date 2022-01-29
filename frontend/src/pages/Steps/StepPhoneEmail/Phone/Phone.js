import React, { useState } from 'react'
import Button from '../../../../Components/Shared/Button/Button'
import Card from '../../../../Components/Shared/Card/Card'
import TextInput from '../../../../Components/Shared/TextInput/TextInput'
import { sendOtp } from '../../../../http/index'
import { useDispatch } from 'react-redux'
import { setOtp } from '../../../../Store/authSlice'
import styles from '../StepEmail.module.css'

const Phone = ({ onNext }) => {
  const dispatch = useDispatch()
  const [phoneNumber, setPhoneNumber] = useState('')

  async function submit () {
    if (!phoneNumber) {
      return
    }
    const { data } = await sendOtp({ phone: phoneNumber })
    console.log(data)
    dispatch(setOtp({ phone: data.phone, hash: data.hash }))
    onNext()
  }

  return (
    <Card title='Enter your phone number!' logo='phone'>
      <TextInput
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        placeholder='Your Number'
      />
      <div className={styles.center}>
        <div className={styles.actionButtonWrap}>
          <Button text='Next' onClick={submit} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  )
}

export default Phone
