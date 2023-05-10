import { UTCDate } from "@date-fns/utc";
import addSeconds from 'date-fns/addSeconds';
import format from "date-fns/format";
import { addMonths } from "date-fns";
import { rateToMonths } from "../lib";

const getPayoutTime = (transaction: any, currentBlock: number) => {
  try {
    const payoutBlock = Number(transaction?.state[1]?.data);
    const createdBlock = Number(transaction?.created);
    const surpassedBlocks = currentBlock - createdBlock;

    if (payoutBlock && createdBlock) {
      const blocks = payoutBlock - surpassedBlocks;
      const now = new UTCDate();
      const blockTimeInSeconds = 50;
      const newTime = addSeconds(now, blocks * blockTimeInSeconds);

      return format(newTime, "do MMMM yyyy");
    }
  } catch {
    return null;
  }
};

export const getPayoutTimeSimplified = (transaction: any) => {
  try {
    const payoutRate = (window as any).MDS.util.getStateVariable(transaction, '105');
    const now = new UTCDate();
    const months = rateToMonths[payoutRate];
    const newTime = addMonths(now, months);

    return format(newTime, "do MMMM yyyy");
  } catch {
    return null;
  }
};

const getEstimatedPayoutTime = (percent: any) => {
  try {
    const now = new UTCDate();
    const payoutTime = addMonths(now, percent.months);
    return format(payoutTime, "do MMMM yyyy");
  } catch {
    return '-';
  }
}

const toFixedIfNecessary = (value: string, dp: number = 9) => {
  return +parseFloat(value).toFixed( dp );
}

export { getPayoutTime, toFixedIfNecessary, getEstimatedPayoutTime };
