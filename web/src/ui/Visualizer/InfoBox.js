import React from 'react'
import Draggable from 'react-draggable'
import { User } from 'react-feather'
import Issue from '../components/icons/Issue'
import Pr from '../components/icons/Pr'
import './infoBox.scss'
import {element} from "prop-types";

const InfoBox = ({ data }) => {
  const openWebLink = () => {
    try { // your browser may block popups
      window.open(data.id)
    } catch (e) { // fall back on url change
      window.location.href = data.id
    }
  }
  let kindClassIcon = <Issue />
  switch (data.kind) {
    case 'Milestone':
      kindClassIcon = <Pr />
      break
    case 'MergeRequest':
      kindClassIcon = <Pr />
      break
    default:
      break
  }
  const authorLink = data.has_author
  let assignLength = 0
  if (data.has_assignee !== undefined) {
    assignLength = data.has_assignee.length
  }
  return (
    <Draggable>
      <div className="info-box">
        <div className="info-box-wrapper">
          <div className={`info-box-status ${data.state}`} />
          <div className="info-box-title">
            {data.local_id}
            {' '}
            (
            {data.driver}
            )
            <div className="info-box-kind-icon">
              {kindClassIcon}
            </div>
          </div>
          <div className="info-box-body">
            {data.title ? data.title.replace(/"/gi, '\'') : 'No title'}
          </div>
          {assignLength !== 0 && authorLink && (
            <div>
              <div className="info-box-assign-link">
                <User size={16} />
                Assign:&nbsp;
                {data.has_assignee.map((element, i) => <a href={element} target="_blank" rel="noopener noreferrer">{element.toString().replace('https://github.com/', '')}
                  {i !== assignLength-1? ', ' : ''}
                </a>)}
              </div>
              <div className="info-box-assign-link">
              <User size={16} />
              Author:&nbsp;
              <a href={`${authorLink}`} target="_blank" rel="noopener noreferrer">{authorLink.replace('https://github.com/', '')}</a>
              </div>
            </div>
          )}
          {authorLink && assignLength === 0 && (
          <div className="info-box-author-link">
            <User size={16} />
             Author:&nbsp;
            <a href={`${authorLink}`} target="_blank" rel="noopener noreferrer">{authorLink.replace('https://github.com/', '')}</a>
          </div>
          )}
          <div className="info-box-actions">
            <button onClick={openWebLink} className="btn btn-primary ml-auto">View on GitHub</button>
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default InfoBox
