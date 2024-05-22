import { useEffect, useState } from 'react'

interface Options {
  timeout?: number
}

export function useClipboard(text: string, options?: Options) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = function () {
    navigator.clipboard.writeText(text)
  }

  useEffect(() => {
    if (isCopied && options && options.timeout) {
      const id = setInterval(() => {
        setIsCopied(false)
      }, options.timeout)
      return () => clearInterval(id)
    }
  }, [isCopied, options])

  return {
    isCopied,
    copyToClipboard: () => {
      copyToClipboard()
      setIsCopied(true)
    },
  }
}
