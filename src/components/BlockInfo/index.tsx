import * as React from "react";
import Block from "../Block";

const BlockInfo: React.FC<any> = ({ data, active, setActive }) => {
  return (
    <div className="flex flex-col flex-grow text-white overflow-hidden">
      <div className="transition grid grid-cols-12 font-bold text-grey bg-grey-two pr-6">
        <div onClick={() => setActive('DETAILS')} className={`col-span-4 text-center cursor-pointer ${active === 'DETAILS' ? 'border-b-4 border-white text-white' : ''}`}>
          <div className="py-4 px-4 pb-3">
            Details
          </div>
        </div>
        <div onClick={() => setActive('INPUT')} className={`col-span-4 text-center cursor-pointer ${active === 'INPUT' ? 'border-b-4 border-white text-white' : ''}`}>
          <div className="py-4 px-4 pb-3">
            Input
          </div>
        </div>
        <div onClick={() => setActive('OUTPUTS')} className={`col-span-4 text-center cursor-pointer ${active === 'OUTPUTS' ? 'border-b-4 border-white text-white' : ''}`}>
          <div className="py-4 px-4 pb-3">
            Outputs
          </div>
        </div>
      </div>
      <div className="content custom-scrollbar flex-grow text-white flex flex-col gap-4 pl-4 pr-5 py-6 lg:p-6">
        {data && active === 'DETAILS' && (
          <>
            <Block title="TxPoW ID" value={data.txpowid} />
            <Block title="Block" value={data.header.block} />
            <Block title="Timestamp" value={data.header.date} />
            <Block title="Size" value={data.size} />
            <Block title="Is it a block?" value={data.isblock ? 'Yes' : 'No'} />
            <Block title="Superblock level" value={data.superblock} />
            <Block title="Parent" value={data?.header?.superparents[0].parent} link={`/t/${data?.header?.superparents[0].parent}`} copy />
            <h5 className="block mt-6 text-lg">Burn Transaction</h5>
            <Block title="Transaction Id" value={data.body.burntxn.transactionid} copy />
            <Block title="Link Hash" value={data.body.burntxn.linkhash} />
            {data.body.txnlist.length > 0 && (
              <>
                <h5 className="block mt-6 text-lg">Transactions</h5>
                {data.body.txnlist.map((txn: any) => (
                  <Block key={txn} title="Transaction" value={txn} link={`/t/${txn}`} copy />
                ))}
              </>
            )}
          </>
        )}
        {data && active === 'INPUT' && (
          <>
            {data.body.txn.inputs.length === 0 && (
              <div className="block p-4 bg-grey-two rounded">
                <div className="text-sm lg:text-base text-grey">Open a transaction to check inputs and outputs.</div>
              </div>
            )}
            {data.body.txn.inputs.length > 0 && data.body.txn.inputs.map((input: any, index: any) => (
              <div className="p-3 bg-grey-three rounded flex flex-col gap-3">
                <Block title="Index" value={index} />
                <Block title="Coin ID" value={input.coinid} />
                <Block title="Address" value={input.address} />
                <Block title="MiniAddress" value={input.miniaddress} />
                <Block title="Token Id" value={input.tokenid} />
                <Block title="Amount" value={input.amount} />
              </div>
            ))}
          </>
        )}
        {data && active === 'OUTPUTS' && (
          <>
            {data.body.txn.outputs.length === 0 && (
              <div className="block p-4 bg-grey-two rounded">
                <div className="text-sm lg:text-base text-grey">Open a transaction to check inputs and outputs.</div>
              </div>
            )}
            {data.body.txn.outputs.length > 0 && data.body.txn.outputs.map((output: any, index: any) => (
              <div className="p-3 bg-grey-three rounded flex flex-col gap-3">
                <Block title="Index" value={index} />
                <Block title="Coin ID" value={output.coinid} />
                <Block title="Address" value={output.address} />
                <Block title="MiniAddress" value={output.miniaddress} />
                <Block title="Token Id" value={output.tokenid} />
                <Block title="Amount" value={output.amount} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default BlockInfo;
