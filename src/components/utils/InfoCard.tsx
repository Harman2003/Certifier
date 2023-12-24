import useAuth from "@/setup/hooks/auth/useAuth";
import useWeb3 from "@/setup/hooks/web3/useWeb3";
import cardBg from "@/assets/cardBg.svg";
import EmailIcon from "@/assets/Email.svg?react";
import IdIcon from "@/assets/idCard.svg?react";
import Web3Icon from "@/assets/Blockchain.svg?react";
import { formatAddress } from "@/utils/formatAddress";

const InfoCard = ({ next }: { next: () => void }) => {
  const { auth } = useAuth();
  const { address } = useWeb3();
  const userInfo = [
    { Icon: EmailIcon, id: "emailID", value: auth.email },
    { Icon: IdIcon, id: "userID", value: auth.id },
    { Icon: Web3Icon, id: "web3Address", value: formatAddress(address, 8, 6) },
  ];

  return (
    <div className="w-[900px] h-[450px] py-4 px-10 rounded-2xl flex items-center justify-center bg-white">
      <div className="flex-1 h-full flex flex-col justify-center">
        <div className="text-black text-5xl leading-[55px] font-bold mb-4">
          Create your own
          <br />
          <span className="text-green-500">Smart Contract</span>
          <br />
          In one click
        </div>
        <div className="text-gray-500">
          A smart contract is a self-executing digital contract with the terms
          of the agreement directly written into code, automating and enforcing
          the agreed-upon rules without the need for intermediaries.
        </div>
        <button
          className=" relative group bg-green-500 hover:bg-green-600 text-white rounded-2xl px-4 py-2 text-2xl font-light mt-10 animate-bounce"
          onClick={() => next()}
        >
          Let's Go
        </button>
      </div>
      <div className="flex-1 h-full flex items-center justify-center">
        <div className="relative z-[2] w-[320px]  bg-white p-3 rounded-3xl shadow-xl flex flex-col items-center font-Nunito">
          <img src={cardBg} alt="smart contract" className="w-full mb-6" />
          <img
            src={auth.picture}
            alt="profile"
            className="rounded-full absolute top-[160px] w-[96px] h-[96px]"
          />
          <div className="text-2xl font-semibold relative">
            <div>{auth.name}</div>
          </div>
          <div>
            {userInfo.map(({ Icon, id, value }, index) => (
              <div
                className="flex items-center gap-2 mb-1 font-light text-sm text-gray-500"
                key={id}
              >
                <Icon />
                <div>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
