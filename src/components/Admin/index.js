import React, {useState} from "react";
import Configure from 'components/Configure'
import {Link} from "react-router-dom";
import Fb from 'images/facebook.svg'
import Tw from 'images/twitter.svg'
import Yt from 'images/youtube.svg'
import Soc from 'images/social.png'
import Arrow from 'images/next.svg'
import './styles.scss'

const Admin = () => {
  const selectionState = [
    {
      id: 1,
      label: "Facebook",
      placeholder: "User name",
      icon: Fb,
      state: false,
      configure: false,
      currentStep: false
    },
    {
      id: 2,
      label: "Twitter",
      placeholder: "Placeholder",
      icon: Tw,
      state: false,
      configure: false,
      currentStep: false
    },
    {
      id: 3,
      label: "YouTube",
      placeholder: "Page name",
      icon: Yt,
      state: false,
      configure: false,
      currentStep: false
    },
    {
      id: 4,
      label: "Social",
      placeholder: "Placeholder",
      icon: Soc,
      state: false,
      configure: false,
      currentStep: false
    },
  ]
  const [selects, setSelects] = useState(false);
  const [selection, setSelection] = useState(selectionState);
  const [sourcesToConfigure, setSourcesToConfigure] = useState([])
  const [isIngestionButtonShow, setIsIngestionButtonShow] = useState(false)
  const onSelectsClick = () => {
    setSelects(!selects)
  };

  const onSourcesClick = () => {
    setSourcesToConfigure(selection.filter(item => item.state))
  };

  const onCheckboxClick = (id) => {
    setSelection(selection.map(item => {
      if (item.id === id) {
        item.state = !item.state
      }
      return item
    }))
  };
  const selectionLength = selection.filter(item => item.state).length;
  const setNextStep = () => {
    if(sourcesToConfigure.length > 1) {
      setSourcesToConfigure(sourcesToConfigure.slice(1))
    }
    else setIsIngestionButtonShow(true)
  }

  return (
    <>
      <div className="admin">
        <div className="admin__buttons">
          <button className="admin__button" onClick={onSelectsClick}>MANAGE SOURCES</button>
          <Link to="/blank">
            <button className="admin__button">MANAGE TEAM</button>
          </Link>
        </div>

      </div>
      {selects
        ? <div className="sources">
          <div className="sources__section sources__section_sources">
            <div className="sources__header">SELECT SOURCES</div>
            <div className="sources__selection">
              {selection ?
                selection.map(item => (
                  <div className="sources__selection-item" key={item.id}>
                    <input
                      className="sources__selection-checkbox"
                      type="checkbox"
                      checked={item.state}
                      onChange={() => onCheckboxClick(item.id)}
                    />
                    <label className="sources__selection-label">{item.label}</label>
                    <img className="sources__selection-icon" src={item.icon} alt=""/>
                  </div>)
                ) : null
              }
            </div>
          </div>

          <div className="sources__section">
            {
              selectionLength
                ? <div className="sources__arrow" onClick={onSourcesClick}>
                  <img className="sources__arrow-icon" src={Arrow} alt=""/>
                </div>
                : null
            }
          </div>
          <div className="sources__section sources__section_configure">
            {sourcesToConfigure.length ? <Configure
                configure={sourcesToConfigure}
                setNextStep={setNextStep}
                setIsIngestionButtonShow={setIsIngestionButtonShow}
              />
             : null
            }
          </div>
          {isIngestionButtonShow
            ? <div className="sources__section sources__section_ingestion">
              <button className="sources__injestion-btn" onClick={()=>alert("Start ingestion")}>Start Ingestion</button>
            </div>
            : null
          }
        </div>
        : null}
    </>
  )
};
export default Admin
