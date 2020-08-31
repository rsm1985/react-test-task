import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {actionOk} from 'redux/main/actions'

const Main = () => {
  const dispatch = useDispatch();
  const main = useSelector(state => state.main)
  console.log("main", main)
  useEffect(() => {
    console.log("rendered")
  }, [main])
  // console.log("main", main)
  return (<div>
    main component
    <button onClick={() => dispatch(actionOk(222))}>Change</button>
  </div>)
}

export default Main
