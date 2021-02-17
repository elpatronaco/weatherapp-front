import { useEffect } from 'react'

const useInterval = (callback: any, delay: number, runImmediately: boolean) => {
  useEffect(() => {
    let cancelled = false

    const func = () => {
      callback(() => cancelled)
    }

    const id = setInterval(func, delay)
    if (runImmediately) func()

    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [callback, delay, runImmediately])
}

export default useInterval
