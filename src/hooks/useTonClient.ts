import { getHttpEndpoint } from '@orbs-network/ton-access'
import { TonClient } from '@ton/ton'
import { useAsyncInit } from './useAsyncInit'

export function useTonClient() {
  return useAsyncInit(
    async () =>
      new TonClient({
        endpoint: await getHttpEndpoint(),
      }),
  )
}
