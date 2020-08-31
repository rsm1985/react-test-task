import React, {useState} from "react"
import Arrow from 'images/next-white.svg'

const Configure = (
  {configure, setNextStep, setIsIngestionButtonShow}) => {
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
      if (configure.length === 1) {
        setIsIngestionButtonShow(true)
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
        ? <div className="configure__next-wrapper" >
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
        : null}
    </div>
  </>
}

export default Configure
