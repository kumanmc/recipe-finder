import React, { useState, useEffect } from 'react'
import { isValidURL } from '../../utils/utils';

interface RecipeFinder {
  api: string;
}

const RecipeFinder: React.FC<RecipeFinder> = ({ api }) => {

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!isValidURL(api)) {
      setErrorMessage('Recipe Finder Error: wrong api value')
      return
    }
  }, [api])

  if (errorMessage) {
    return <h1>{errorMessage}</h1>
  }

  return <h1>Recipe Finder</h1>
}

export default RecipeFinder