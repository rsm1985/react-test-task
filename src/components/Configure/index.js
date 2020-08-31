import React, {useState} from "react"
import {actionSaveInput} from 'redux/configure/actions'

const Configure = (
  {configure, setConfigureComplete, checkAfterRemoveSnack, setNextStep, setIsIngestionButtonShow}) => {
  // const active = selection.find(item => item.state);
  const [snacks, setSnacks] = useState([]);
  const [input, setInput] = useState("");

  const onInputChange = (e) => {
    setInput(e.target.value)
  };
  const onAddSnack = (e) => {
    if (e.key === 'Enter') {
      const newSnacks = snacks.slice();
      newSnacks.push(e.target.value);
      setSnacks(newSnacks);
      setInput("");
      setConfigureComplete(configure[0].id);
      if(configure.length === 1) {
        setIsIngestionButtonShow(true)
      }

    }
  };
  const onRemoveSnack = (snack) => {
    setSnacks(snacks.filter(item => item !== snack))
    setConfigureComplete(configure[0].id, snacks.length)
  }
  return <>
    <div className="sources__header">CONFIGURE SOURCES</div>
    <div className="configure">
      <img className="configure__logo" src={configure[0].icon} alt="Icon"/>
      <div className="configure__username">
        <div className="configure__label">
          UserName
        </div>
        <div className="configure__input">
          {
            snacks.map((item, index) => <div className="configure__snack" key={index}>
              {item}
              <div className="configure__remove-snack" onClick={() => onRemoveSnack(item)}>X</div>
            </div>)
          }
          <input
            className="configure__input-field"
            type="text"
            value={input}
            onChange={onInputChange}
            onKeyPress={onAddSnack}/>
        </div>
      </div>
      {snacks.length && (configure.length > 1)
        ? <div className="configure__next" onClick={() => {
          setSnacks([])
          setNextStep()
        }}>
          Next
        </div>
        : null}

    </div>

  </>
}

export default Configure
