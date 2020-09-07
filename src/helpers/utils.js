import {SELECTIONS_PER_PAGE} from 'helpers/constants'

export const calculateNumberOfPages = (sources) => {

  let buttons = []
  let numberOfPages = 0;
  // console.log("sources / SELECTIONS_PER_PAGE", sources / SELECTIONS_PER_PAGE)
  // console.log("Math.floor(sources / SELECTIONS_PER_PAGE)", Math.floor(sources / SELECTIONS_PER_PAGE))
  if(sources % SELECTIONS_PER_PAGE === 0) {
    numberOfPages = sources / SELECTIONS_PER_PAGE
  } else {
    numberOfPages = Math.ceil(sources / SELECTIONS_PER_PAGE)
  }
  for (let i = 1; i <= numberOfPages; i++) {
    buttons.push(i)
  }
  // console.log("sources", sources)
  console.log("numberOfPages", numberOfPages)
  // console.log("buttons", buttons)
  return buttons
}
