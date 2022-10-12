import PubSub from 'pubsub-js';
import { IBlock } from 'renderer/database/DB';

type cb = (...data: any) => void;

const blocksWithSubs: Map<string, string[]> = new Map();

/**
 *
 * @param _id
 * @param callBack
 * @returns
 */
export const subscribeToBlock = (_id: string, callBack: cb) => {
  const token = PubSub.subscribe(`changed:${_id}`, callBack);
  if (!blocksWithSubs.has(_id)) {
    blocksWithSubs.set(_id, [token]);
  } else {
    blocksWithSubs.get(_id)?.push(token);
  }
};
/**
 *
 * @param token
 */
export const unsubscribeToBlock = (_id: string) => {
  if (blocksWithSubs.has(_id)) {
    blocksWithSubs.get(_id)?.forEach((token) => PubSub.unsubscribe(token));
  }
};
/**
 *
 * @param topic
 * @param payload
 */
export const notify = (payload: {
  _id: string;
  block?: IBlock;
  deleted?: boolean;
}) => {
  for (const [key, _] of blocksWithSubs.entries()) {
    PubSub.publish(`changed:${key}`, payload);
  }
};
