import { useEffect, useState } from 'react'
import { useTonClient } from './useTonClient'
import { useAsyncInit } from './useAsyncInit'
import Counter from '../contracts/counterContract'
import { Address, OpenedContract } from '@ton/core'
import { useTonConnect } from './useTonConnect'

export function useCounterContract() {
  const client = useTonClient()
  const [val, setVal] = useState<null | number>()
  const { sender, connected } = useTonConnect()

  const counterContract = useAsyncInit(async () => {
    if (!client) return
    const contract = new Counter(Address.parse('EQArd9ecpwnWLo_sXw_31kkIXVN143YXstPjca2s9H9VdE-j'))
    return client.open(contract) as OpenedContract<Counter>
  }, [client])

  async function getValue() {
    if (!counterContract) return
    setVal(null)
    const val = await counterContract.getCounter()
    setVal(Number(val))
  }

  useEffect(() => {
    getValue()
  }, [counterContract])

  return {
    value: val,
    address: counterContract?.address.toString(),
    connected,
    increment: async () => {
      await counterContract?.sendIncrement(sender)
    },
    getValue: async () => {
      await getValue()
    },
  }
}
