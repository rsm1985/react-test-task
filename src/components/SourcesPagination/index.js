import React from "react";
import {calculateNumberOfPages} from 'helpers/utils'
import './styles.scss'

export default function SourcesPagination({activePage, setActivePage, sources}) {
  return (
    <div className="pagination">
      {calculateNumberOfPages(sources).map((item, index) =>
        <div className="pagination__button" onClick={()=>{
          setActivePage(item)
        }} key={index}>{item}</div>)}

    </div>
  )
}
