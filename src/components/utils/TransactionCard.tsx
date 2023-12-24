const TransactionCard = ({isHash,type, hash}:{type:string | undefined, hash:string | undefined, isHash:boolean}) => {
  return (
    <div className="border p-6 rounded-2xl font-Nunito flex gap-10">
      <div>
        <div className="text-xl font-semibold">Request Type</div>
              <div className="italic">{type}</div>
      </div>
      <div>
        <div className="text-xl font-semibold">{isHash?"Transaction Hash":"Contract Address"}</div>
        <div className="italic text-blue-800 font-medium">
          {hash}
        </div>
      </div>
    </div>
  );
}

export default TransactionCard
