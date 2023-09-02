import React from 'react'
import Styles from "./Loader.module.css"

export default function Loader() {
  return <div className='d-flex align-items-center justify-content-center' style={{height:"100vh"}}>
    <div className="loader">Loading...</div>
  </div>
}
