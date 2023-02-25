// eslint-disable-next-line no-dupe-else-if
import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideBtnWhenVisible = { display: visible ? 'none': '' }
  const showFormWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <div style={hideBtnWhenVisible} >
        <button onClick={toggleVisibility} id="btn-label">{props.buttonLabel}</button>
      </div>
      <div style={showFormWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'
export default Togglable