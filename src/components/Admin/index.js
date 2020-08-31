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
      icon: Fb,
      state: false,
      configure: false
    },
    {
      id: 2,
      label: "Twitter",
      icon: Tw,
      state: false,
      configure: false
    },
    {
      id: 3,
      label: "YouTube",
      icon: Yt,
      state: false,
      configure: false
    },
    {
      id: 4,
      label: "Social",
      icon: Soc,
      state: false,
      configure: false
    },
  ]
  const [selects, setSelects] = useState(false);
  const [sources, setSources] = useState(false);
  const [selection, setSelection] = useState(selectionState);
  const onSelectsClick = () => {
    setSelects(!selects)
  };
  const onSourcesClick = () => {
    setSources(true)
  }

  const onCheckboxClick = (id) => {
    setSources(false)
    setSelection(selection.map(item => {
      if (item.id === id) {
        item.state = !item.state
      }
      return item
    }))
  };
  const setCompleteConfigure = (id, snacksLength) => {
    console.log("setCompleteConfigure id: ", id)
    setSelection(selection.map(item => {
      if (snacksLength || item.id === id) {
        console.log("item.id === id", id)
        item.configure = true
      } else item.configure = false
      return item
    }))
  };
  const selectionLength = selection.filter(item => item.state).length;
  const checkAfterRemoveSnack = (id) => {


  }
  const isIngestionShow = () => {
    const checked = selection.filter(item => item.state).length
    const proceed = selection.filter(item => item.configure).length
    return checked !== 0 && checked === proceed;
  };
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

            {selectionLength && sources
              ? <Configure
                selection={selection}
                setConfigureComplete={setCompleteConfigure}
                checkAfterRemoveSnack={checkAfterRemoveSnack}
              />
              : null}
          </div>
          {isIngestionShow()
            ? <div className="sources__section sources__section_ingestion">
              <button className="sources__injestion-btn">Start Ingestion</button>
            </div>
            : null
          }
        </div>
        : null}
    </>
  )
};
export default Admin
