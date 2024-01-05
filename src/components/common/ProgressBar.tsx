import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = ({
  page,
  onPageNumberClick,
}: {
  page: number;
  onPageNumberClick:React.Dispatch<React.SetStateAction<number>>;
}) => {
  var stepPercentage = 0;
  if (page === 1) {
    stepPercentage = 16;
  } else if (page === 2) {
    stepPercentage = 49.5;
  } else if (page === 3) {
    stepPercentage = 82.5;
  } else if (page === 4) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <ProgressBar percent={stepPercentage}>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick(1)}
          >
            {index + 1}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick(2)}
          >
            {index + 1}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick(3)}
          >
            {index + 1}
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
