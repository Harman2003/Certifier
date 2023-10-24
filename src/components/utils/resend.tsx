import { useTimer } from 'react-timer-hook';

interface ComponentProps {
  callOtp: () => void;
}

const Resend: React.FC<ComponentProps> = ({callOtp}) => {
  const now = new Date();
  const futureTime = new Date(now.getTime() + 30000);
  const { totalSeconds, restart } = useTimer({
    expiryTimestamp: futureTime,
  });
  const handleResend = () => {
    console.log("resend");
    callOtp();
    restart(futureTime);
  };
  return (
    <button
      disabled={totalSeconds != 0}
      className=" mb-1 ml-3 text-blue-800"
      style={{ color: totalSeconds != 0 ? "gray" : "" }}
      onClick={handleResend}
    >
      {"Resend " + (totalSeconds != 0 ? `(${totalSeconds})` : "")}
    </button>
  );
};

export default Resend
