import { useTimer } from "react-timer-hook";
import { IoReload } from "react-icons/io5";

interface ComponentProps {
  callOtp: () => void;
}

const Resend: React.FC<ComponentProps> = ({ callOtp }) => {
  const now = new Date();
  const futureTime = new Date(now.getTime() + 30000);
  const { totalSeconds, restart } = useTimer({
    expiryTimestamp: futureTime,
  });
  const handleResend = () => {
    console.log("resend");
    callOtp();
    restart(new Date(new Date().getTime() + 30000));
  };
  return (
    <button
      disabled={totalSeconds != 0}
      className=" text-blue-800"
      style={{ color: totalSeconds != 0 ? "gray" : "" }}
      onClick={handleResend}
    >
      {totalSeconds == 0 ? (
        <div className="flex items-center gap-1">
          Retry
        </div>
      ) : (
        <>{"(" + totalSeconds + ")"}</>
      )}
    </button>
  );
};

export default Resend;
