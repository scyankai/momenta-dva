import React from 'react'

let LoadingComponent = () => null

function initialize(initializer) {
	return target => {
		return class extends React.PureComponent {
			constructor(props) {
				super(props)
				this.state = {
					initial: false,
					props: null,
				}
				this.init = this.init.bind(this)
				this.executeInitializer = this.executeInitializer.bind(this)
				this.handleInitializerResult = this.handleInitializerResult.bind(this)
			}

			componentWillMount() {
				this.executeInitializer()
			}

			init(props) {
				this.setState({ initial: true, props })
			}

			executeInitializer() {
				if (typeof initializer === 'function') {
					const result = initializer(this.props)
					this.handleInitializerResult(result)
				} else {
					this.init()
				}
			}

			handleInitializerResult(result) {
				if (result && typeof result.then === 'function') {
					result.then(this.handleInitializerResult)
				} else if (typeof result === 'object') {
					this.init(result)
				} else {
					this.init()
				}
			}

			render() {
				const { initial, props } = this.state
				if (initial) {
					return React.createElement(target, { ...this.props, ...props })
				} else {
					return React.isValidElement(LoadingComponent) ? LoadingComponent : React.createElement(LoadingComponent)
				}
			}
		}
	}
}

initialize.setDefaultLoadingComponent = component => {
	LoadingComponent = component
}

export default initialize

/**
 * 
 
 @initialize(props => {
	const { match } = props
	return {
		imei: match.params.imei,
	}
})
@initialize(() => {
	return new Promise(resolve => {
		setTimeout(resolve, 2000)
	})
})

*/
