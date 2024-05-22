import { useEffect, useState } from 'react'

export function useAsyncInit<T>(func: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<T | undefined>()
  useEffect(() => {
    ;(async () => {
      setState(await func())
    })()
  }, deps)

  return state
}