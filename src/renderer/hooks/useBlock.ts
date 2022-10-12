import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import dbService from 'renderer/database/dbService';
import { queryClientManager } from 'renderer/database/queryClientManager';
import { subscribeToBlock, unsubscribeToBlock } from '../database/pubsub';
import { useDeepMemo } from './useDeepMemo';
/**
 *
 * @param _id blockId
 * @returns Block
 */
const useBlock = (_id: string) => {
  const queryKey = useDeepMemo(['page', _id]);
  const data = useQuery(queryKey, () => dbService.retrieve(_id));
  useEffect(() => {
    subscribeToBlock(_id, (...payload) => {
      const [_, doc] = payload;
      queryClientManager.queryClient.setQueryData(queryKey, doc.block);
    });
    return () => unsubscribeToBlock(_id);
  }, [queryKey, _id]);

  return data;
};

export default useBlock;
