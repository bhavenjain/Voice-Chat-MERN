import React, { useState } from 'react'
import Button from '../../../../Components/Shared/Button/Button'
import Card from '../../../../Components/Shared/Card/Card'
import TextInput from '../../../../Components/Shared/TextInput/TextInput'
import styles from '../StepEmail.module.css'

const Email = ({ onNext }) => {
  const [email, setEmail] = useState('')

  return (
    <Card title="Enter your Email!" logo="email-emoji">
      <TextInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
      />
      <div className={styles.center}>
        <div className={styles.actionButtonWrap}>
          <Button onClick={onNext} text="Next" />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your email, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  )
}

export default Email
