import { useState, useEffect } from 'react'

// sd 230424 https://blog.logrocket.com/using-localstorage-react-hooks/
function getStorageValue(key, defaultValue) {
  // getting stored value
  console.log('useLocalStorage initial - key is: ' + key + ' and defaultValue is: ' + JSON.stringify(defaultValue))
  const storedValueJson = localStorage.getItem(key)
  console.dir(storedValueJson)
  const storedValue = JSON.parse(storedValueJson)
  return storedValue || defaultValue
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  })

  useEffect(() => {
    // storing input name
    console.log('in useLocalStorage hook - key is: ' + key + ' and value is: ' + JSON.stringify(value))
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}