import {useState} from 'react'
import { css, jsx } from '@emotion/react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

export default function StepBar() {
  const [activeStep,setActiveStep] = useState(0);
  const steps = ['挑選EPS','挑選月營收','c']
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}
