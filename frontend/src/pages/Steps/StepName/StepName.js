import React, { useState } from 'react'
import Button from '../../../Components/Shared/Button/Button'
import Card from '../../../Components/Shared/Card/Card'
import TextInput from '../../../Components/Shared/TextInput/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { setName } from '../../../Store/activateSlice'
import styles from './StepName.module.css'

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate)
  const dispatch = useDispatch()
  const [fullName, setFullName] = useState(name)

  const nextStep = () => {
    if (!fullName) {
      return
    }
    dispatch(setName(fullName))
    onNext()
  }

  return (
    <div className="cardWrapper">
      <Card title="What's your full name?" logo="goggle-emoji">
        <TextInput
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your Name"
        />
        <div className={styles.center}>
          <p className={styles.bottomParagraph}>
            People normally use their real names
          </p>
          <div className={styles.actionButtonWrap}>
            <Button onClick={nextStep} text="Next" />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default StepName
