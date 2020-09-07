import React from "react";

const calculateNumberOfPages = (sources, activePage) => {
  let buttons = []
  let numberOfPages = 0;
  const result = sources % 5;
  if(result === 0) {
    numberOfPages = result
  } else {
    numberOfPages = result + 1
  }
  for (let i = 1; i <= numberOfPages; i++) {
    buttons.push(i)
  }
  return buttons
}
export default function SourcesPagination({activePage, setActivePage, sources}) {

  return (
    <div className="pagination">
      {calculateNumberOfPages(sources, activePage).map((item, index) =>
        <div className="pagination__button" onClick={()=>setActivePage(item)} key={index}>{item}</div>)}

    </div>
  )
}
