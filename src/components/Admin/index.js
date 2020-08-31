import React, {useState} from "react";
import {Link} from "react-router-dom";
import Fb from 'images/facebook.svg'
import Tw from 'images/twitter.svg'
import Yt from 'images/youtube.svg'
import Soc from 'images/social.png'
import './styles.scss'

const Admin = () => {
  const selectionState = [
    {
      id: 1,
      label: "Facebook",
      icon: Fb,
      state: false
    },
    {
      id: 2,
      label: "Twitter",
      icon: Tw,
      state: false
    },
    {
      id: 3,
      label: "YouTube",
      icon: Yt,
      state: false
    },
    {
      id: 4,
      label: "Social",
      icon: Soc,
      state: false
    },
  ]
  const [sources, setSources] = useState(false);
  const [selection, setSelection] = useState(selectionState);
  const onSourcesClick = () => {
    setSources(!sources)
  };
  const onCheckboxClick = (id) => {
    setSelection(selection.map(item => {
      if (item.id === id) {
        item.state = !item.state
        console.log(id)
      }
      return item
    }))
  }
  return (
    <>
      <div className="admin">
        <div className="admin__buttons">
          <button className="admin__button" onClick={onSourcesClick}>MANAGE SOURCES</button>
          <Link to="/blank">
            <button className="admin__button">MANAGE TEAM</button>
          </Link>
        </div>

      </div>
      {sources
        ? <div className="sources">
          <div className="sources__section sources__section_sources">
            <div className="sources__header">SELECT SOURCES</div>
            <div className="sources__selection">
              { selection ?
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

          </div>
          <div className="sources__section">

          </div>

        </div>
        : null}
    </>
  )
};
export default Admin
