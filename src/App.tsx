import { useState } from 'react';
import type { SubmitEvent } from 'react';

import './App.css'

function App() {
  const [searchPrompt, setSearch] = useState(0)

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search"></label>
        <input id="search"/>
        <button type="submit">Search</button>
      </form>
    </>
  )
}

export default App
