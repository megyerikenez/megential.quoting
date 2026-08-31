import { useEffect, useRef } from 'react'
import { CalculatorApp } from './calculator/CalculatorApp'
import { CalculatorProvider } from './calculator/CalculatorContext'
import { getServiceByPresetId } from './data/services'
import { useHashRoute } from './lib/router'
import { Landing } from './pages/Landing'

export default function App() {
  const route = useHashRoute()
  const prevPath = useRef(route.path)

  // Scroll to the top on route change. Anchor links (#szolgaltatasok) are
  // scrolled natively by the browser.
  useEffect(() => {
    if (prevPath.current !== route.path) {
      window.scrollTo({ top: 0 })
      prevPath.current = route.path
    }
  }, [route.path])

  if (route.path === '/kalkulator') {
    const presetId = route.query.get('svc')
    const preset = presetId ? getServiceByPresetId(presetId)?.preset : undefined
    return (
      <CalculatorProvider preset={preset}>
        <CalculatorApp />
      </CalculatorProvider>
    )
  }

  return <Landing />
}
