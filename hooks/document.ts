// Document hook
// help to get data related to the browser document
import { useEffect, useState } from 'react'

interface HookScroll {
  fromTop: number
  fromBottom: number
}

export function useScroll(): HookScroll {
  const [fromTop, setFromTop] = useState<number>(0)
  // Set initial value greater than 0
  const [fromBottom, setFromBottom] = useState<number>(1)

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleScroll() {
    setFromTop(document.documentElement.scrollTop)
    setFromBottom(
      document.body.offsetHeight -
        (window.innerHeight + Math.round(window.scrollY))
    )
  }

  return {
    fromTop,
    fromBottom
  }
}
