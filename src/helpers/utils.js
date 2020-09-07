import {SELECTIONS_PER_PAGE} from 'helpers/constants'

export const calculateNumberOfPages = (sources) => {
  let buttons = []
  let numberOfPages = 0;
  if(sources % SELECTIONS_PER_PAGE === 0) {
    numberOfPages = sources / SELECTIONS_PER_PAGE
  } else {
    numberOfPages = sources / SELECTIONS_PER_PAGE + 1
  }
  for (let i = 1; i <= numberOfPages; i++) {
    buttons.push(i)
  }
  console.log("buttons", buttons)
  return buttons
}
