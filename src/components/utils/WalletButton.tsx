import useWeb3 from '@/setup/hooks/web3/useWeb3'
import walletImg from "@/assets/wallet.svg";
import copyIcon from "@/assets/copy.svg";
import copiedIcon from "@/assets/copied.svg";
import Jazzicon from "react-jazzicon";
import { formatAddress } from "@/utils/formatAddress";
import { useState } from 'react';

const WalletButton = () => {
  const { isConnected, web3, address, connect } = useWeb3();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const seed = parseInt(address?.slice(2, 10) || "", 16);

  const copyAddress = () => {
    if (!isCopied) { 
      navigator.clipboard.writeText(address || "");
      setIsCopied(true);
    }
  }

  return isConnected ? (
    <button className="border-[1px] border-black px-6 h-10 rounded-full flex gap-2 items-center ml-auto font-Nunito relative group" onClick={copyAddress} onMouseLeave={()=>setIsCopied(false)}>
      <div className="flex items-center justify-center border-[2px] p-[1px] rounded-full">
        <Jazzicon diameter={20} seed={seed} />
      </div>
      <div className="text-sm">{formatAddress(address || "", 7, 5)}</div>
      <img src={isCopied?copiedIcon:copyIcon} alt="copy" className="h-[18px]" />

      {/* copy Address popup */}
      <div className='hidden absolute top-[26px] bg-popup bg-cover w-[152px] h-[46px] group-hover:flex items-center justify-center popup'><div className='relative top-1'>{isCopied?"Copied!":"Copy to clipboard"}</div></div>
    </button>
  ) : (
    <button className="ml-auto" onClick={() => connect()}>
      <img src={walletImg} alt="" className="h-10" />
    </button>
  );
}

export default WalletButton
