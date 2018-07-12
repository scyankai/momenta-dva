import React from 'react'

const config = {}

let defaultLoadingComponent = () => null
let onLoadingFailDefault = () => null

const STATE = {
  INITIALIZING: 1,
  SUCCESS: 2,
  FAIL: 3
}

function initializeComponent(key, initializer) {
  const { loadingComponent = defaultLoadingComponent, onLoadingFail = onLoadingFailDefault } = config[key] || {}
  return target => {
    return class extends React.PureComponent {
      constructor(props) {
        super(props)
        this.state = {
          initializationState: STATE.INITIALIZING,
          props: null
        }
        this.handleSuccess = this.handleSuccess.bind(this)
        this.handleFail = this.handleFail.bind(this)
        this.runInitializer = this.runInitializer.bind(this)
        this.handleInitializerResult = this.handleInitializerResult.bind(this)
      }

      componentWillMount() {
        this.runInitializer()
      }

      handleSuccess(props) {
        this.setState({ initializationState: STATE.SUCCESS, props })
      }

      handleFail(err) {
        this.setState({ initializationState: STATE.FAIL })
      }

      runInitializer() {
        if (typeof initializer === 'function') {
          try {
            const result = initializer(this.props)
            this.handleInitializerResult(result)
          } catch (err) {
            this.handleFail(err)
          }
        } else {
          this.handleSuccess()
        }
      }

      handleInitializerResult(result) {
        if (result && typeof result.then === 'function') {
          result.then(this.handleInitializerResult, this.handleFail)
        } else if (typeof result === 'object') {
          this.handleSuccess(result)
        } else {
          this.handleSuccess()
        }
      }

      render() {
        const { initializationState, props } = this.state
        if (initializationState === STATE.SUCCESS) {
          return React.createElement(target, { ...this.props, ...props })
        } else if (initializationState === STATE.INITIALIZING) {
          return React.isValidElement(loadingComponent) ? loadingComponent : React.createElement(loadingComponent)
        } else {
          return onLoadingFail()
        }
      }
    }
  }
}

const initialize = initializeComponent.bind(null, null)

initialize.configureDefault = options => {
  const { loadingComponent, onLoadingFail } = options
  if (loadingComponent) defaultLoadingComponent = loadingComponent
  if (onLoadingFail) onLoadingFailDefault = onLoadingFail
}

initialize.configure = (key, options) => {
  if (key == null || typeof key !== 'string') throw Error('key is invalid')
  config[key] = options || {}
}

initialize.of = key => initializeComponent.bind(null, key)

export default initialize
