import { useState } from "react";

// this stepper will control rendering of components in the complete profile stage.

function useStepper() {
  const [step, setStep] = useState(0);

  const forward = () => {
    setStep((currStep) => {
      return (currStep = currStep + 1);
    });
  };

  const backward = () => {
    setStep((currStep) => {
      return (currStep = currStep - 1);
    });
  };

  return { step, forward, backward };
}

export default useStepper;
