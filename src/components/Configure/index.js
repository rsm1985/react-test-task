import React, {useState, memo} from "react"
import Arrow from 'images/next-white.svg'
import {inputValidValues} from 'helpers/constants'

const Configure = (
  {configure, setNextStep, setIsIngestionButtonShow}) => {
  const [snacks, setSnacks] = useState([]);
  const [input, setInput] = useState("");

  const onInputChange = (e) => {
    const lastValue = e.target.value.toLowerCase().split("").pop()
    for (let i = 0; i < inputValidValues.length; i++) {
      if (inputValidValues[i] === lastValue) {
        setInput(e.target.value.toLowerCase())
        return
      }
    }
  };
  const onAddSnack = (e) => {
    if (e.key === 'Enter') {
      const newSnacks = snacks.slice();
      const newValue = e.target.value.toLowerCase().trim()
      if (newValue.length) {
        newSnacks.push(newValue);
        setSnacks(newSnacks);
        setInput("");
        if (configure.length === 1) {
          setIsIngestionButtonShow(true)
        }
      }
    }
  };
  const onRemoveSnack = (snack) => {
    setSnacks(snacks.filter(item => item !== snack))
    if (snacks.length === 1) {
      setIsIngestionButtonShow(false)
    }
  }
  return <>
    <div className="sources__header">CONFIGURE SOURCES</div>
    <div className="configure">
      <img className="configure__logo" src={configure[0].icon} alt="Icon"/>
      <div className="configure__username">
        <div className="configure__label">
          {configure[0].placeholder}
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
            onKeyDown={onAddSnack}
            disabled={snacks.length === 5}
          />
          <div className="configure__error">
            {snacks.length === 5 ? "Maximum limit of 5 is reached" : ""}
          </div>
        </div>
        {
          snacks.length ? <div className="configure__validate">
            <button className="admin__button">VALIDATE</button>
          </div> : null
        }

      </div>

      {
        snacks.length && (configure.length > 1)
          ? <div className="configure__next-wrapper">
            <div className="configure__next" onClick={() => {
              setSnacks([])
              setNextStep()
            }}>
              <div className="configure__next-arrow">
                <img className="configure__arrow-icon" src={Arrow} alt="arrow"/>
              </div>
              <div className="configure__arrow-label">
                {configure[1].label}
              </div>
            </div>
          </div>
          : null
      }
    </div>
  </>
}

export default memo(Configure)
