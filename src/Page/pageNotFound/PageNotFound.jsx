import React, { useEffect } from 'react'
import Styles from "./PageNotFound.module.css"

export default function PageNotFound({title}) {
  useEffect(()=>{
    document.title=title
  },[])
  return <section id={Styles.page}>
  <div id={Styles.pageNotFound}>
    <p className={Styles.sry_msg}>404</p>
    <p className={Styles.file_not_found}>This page could not be found.</p>
  </div>
  </section>
}
