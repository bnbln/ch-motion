import React from "react"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"
const timeout = 700
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
    marginTop: 200
  },
  entered: {
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 1,
    marginTop: 0
  },
  exiting: {
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 0,
    marginTop: -200
  },
}
class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props
    return (
      <TransitionGroup>
        <ReactTransition
          key={location.pathname}
          timeout={{
            enter: timeout,
            exit: timeout,
          }}
        >
          {status => (
            <div
              style={{
                ...getTransitionStyles[status],
              }}
            >
              {children}
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    )
  }
}
export default Transition