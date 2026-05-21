import { useState, useCallback } from 'react'

export const useFetch = (initialUrl) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async (url = initialUrl) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`API error: ${response.status}`)
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [initialUrl])

  return { data, loading, error, fetchData }
}

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch {
      console.error('Failed to save to localStorage')
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}
