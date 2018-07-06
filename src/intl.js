import React from 'react'
import fmt from 'string-format'

let current = 'zh'
let fallback = 'en'
let handlers = []
let global = {}

const LocaleContext = React.createContext(current)

const translate = local => {
  const languages = { ...global, ...local }
  return (key, ...params) => {
    const item = languages[key]
    if (item === undefined) {
      throw new Error(`intl:Can't find the key [${key}] in locales`)
    }
    let text = item[current]
    if (text === undefined) {
      text = item[fallback]
    }
    if (text === undefined || typeof text !== 'string') {
      throw new Error(`intl:No languages(${current},${fallback}) for the key[${key}]`)
    }
    return fmt(text, ...params)
  }
}

const intl = target => props => <LocaleContext.Consumer>{value => React.createElement(target, { ...props, locale: value })}</LocaleContext.Consumer>

intl.locale = (...args) => {
  if (args.length === 0) return current
  else {
    const [currentLocale, fallbackLocale] = args
    if (current === currentLocale && fallback === fallbackLocale) return
    current = currentLocale
    fallback = fallbackLocale
    handlers.forEach(handler => handler(current))
  }
}

intl.global = languages => {
  global = languages
}

intl.onChanged = handler => {
  if (handler && typeof handler === 'function') {
    handlers.push(handler)
  } else {
    throw Error('intl:The parameter of intl.onChanged must be a function')
  }
  return () => {
    handlers = handlers.filter(f => f !== handler)
  }
}

intl.load = languages => translate(languages)

export class LocaleContextProvider extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      locale: current
    }
    this.removeHandler = intl.onChanged(this.handleChange.bind(this))
  }

  componentWillUnmount() {
    this.removeHandler()
  }

  handleChange(locale) {
    this.setState({ locale })
  }

  render() {
    return <LocaleContext.Provider value={this.state.locale}>{this.props.children}</LocaleContext.Provider>
  }
}

export default intl
