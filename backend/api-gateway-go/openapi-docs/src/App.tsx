import { useState } from 'react'
import { RedocStandalone } from 'redoc';

function App() {


  return (
    <RedocStandalone specUrl='panda-gateway.yaml'></RedocStandalone>
  )
}

export default App
