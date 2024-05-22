import { TonConnectButton } from '@tonconnect/ui-react'
import { useCounterContract } from './hooks/useCounterContract'
import { useClipboard } from './hooks/useClipboard'
import '@twa-dev/sdk'

function App() {
  const { value, address, increment, getValue } = useCounterContract()
  const { copyToClipboard, isCopied } = useClipboard(address ?? '', { timeout: 3000 })
  const { copyToClipboard: copyCounter, isCopied: isCounterCopied } = useClipboard(String(value ?? ''), {
    timeout: 3000,
  })
  return (
    <div>
      <div className="flex w-full justify-end bg-sky-500 px-4 py-3">
        <TonConnectButton />
      </div>

      <div className="mt-4 px-4">
        <dl>
          <dt className="text-xs uppercase tracking-wide text-gray-500">Counter Address:</dt>
          <dd className="mt-1 font-semibold">
            <button onClick={copyToClipboard}>{address?.slice(0, 30) + '...'}</button>
            {isCopied && <span className="mt-1 text-xs text-green-500">Address copied!</span>}
          </dd>
        </dl>

        <dl className="mt-10">
          <div className="flex items-end gap-x-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-gray-500">Current counter value</dt>
              <dd className="mt-1 flex flex-col items-start font-semibold">
                <button onClick={copyCounter}>{value ?? 'Loading...'}</button>
                {isCounterCopied && <span className="text-xs font-light text-green-500">Counter copied!</span>}
              </dd>
            </div>
            <button
              className="rounded border border-gray-300 bg-transparent px-2 py-1 text-xs hover:bg-gray-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-35"
              disabled={value ? false : true}
              onClick={getValue}
            >
              Check Value
            </button>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex justify-center border-t border-gray-300 px-4 pt-8">
        <button className="rounded bg-sky-500 px-6 py-1 text-white" onClick={increment}>
          <span className="text-xs uppercase tracking-wider">Increment</span>
        </button>
      </div>
    </div>
  )
}

export default App
