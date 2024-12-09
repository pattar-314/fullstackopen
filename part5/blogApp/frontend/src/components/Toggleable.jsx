import { forwardRef, useImperativeHandle, useState } from "react"


const Toggleable = forwardRef((props, refs) => {

  const [isVisible, setIsVisible] = useState(false)

  useImperativeHandle(refs, () => {
    return { toggleIsVisible }
  })

  const toggleIsVisible = () => setIsVisible(!isVisible)

  const showWhenVisible = isVisible ? null : {'display': 'none'}
  const hideWhenVisible = isVisible ? {'display': 'none'} : null



  return (
    <div className="toggleable-wrapper">
      <div className="toggleable-component" style={showWhenVisible}>
        <div>{props.children}</div>
        <button onClick={toggleIsVisible}>cancel</button>
      </div>
      <button onClick={toggleIsVisible} style={hideWhenVisible}>{props.buttonLabel}</button>
    </div>
  )
})

export default Toggleable