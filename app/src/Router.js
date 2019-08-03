import 'babel-polyfill'
import React, { Component } from 'react'
import Layout from './Layout'
import Main from './routes/Main'
// import Open from './routes/Open'
// import Support from './routes/Support'
// import FouroFour from './routes/FouroFour'
// import About from './routes/About'
// import GDPR from './routes/GDPR'
// import TOS from './routes/TOS'
// import Login from './routes/Login'
// import Logout from './routes/Logout'
// import ChooseTeam from './routes/ChooseTeam'
// import Team from './routes/Team'
// import Statistics from './routes/Statistics'
// import Analytics from './routes/Analytics'
// import Profile from './routes/Profile'
// import Pro from './routes/Pro'

function componentFor (url) {
  let componentName = 'FouroFour'
  if (url === '/') componentName = 'Main'
  if (url === '/about') componentName = 'About'
  if (url === '/open') componentName = 'Open'
  if (url === '/support') componentName = 'Support'
  if (url === '/login') componentName = 'Login'
  if (url === '/logout') componentName = 'Logout'
  if (url === '/team') componentName = 'ChooseTeam'
  if (url === '/pro') componentName = 'Pro'
  if (url === '/profile') componentName = 'Profile'
  if (url === '/gdpr') componentName = 'GDPR'
  if (url === '/tos') componentName = 'TOS'
  if (/\/team/.test(url)) componentName = 'Team'
  if (/\/analytics/.test(url)) componentName = 'Analytics'
  if (/\/statistics/.test(url)) componentName = 'Statistics'
  const componentPath = `./routes/${componentName}.js`
  console.log('componentPath %s', componentPath)
  return import(componentPath).then((x) => {
    debugger
    return x
  })
}

export default class Root extends Component {
  constructor () {
    super()
    this.state = {current: <Main />, currentUrl: '/'}
    window.addEventListener('popstate', (event) => {
      const url = event.url || window.location.pathname
      this.setState({currentUrl: url})
      componentFor(url).then(comp => {
        debugger
        this.setState({current: <comp />})
      })
      .catch(err => {
        debugger
        console.error(err)
      })
      // if (url === '/') return this.setState({current: <Main />})
      // if (url === '/about') {
      //   return import('./routes/About')
      //     .then(({default: About}) => {
      //       this.setState({current: <About />})
      //     })
      // }
      // if (url === '/open') return this.setState({current: <Open />})
      // if (url === '/support') return this.setState({current: <Support />})
      // if (url === '/login') return this.setState({current: <Login />})
      // if (url === '/logout') return this.setState({current: <Logout />})
      // if (url === '/team') return this.setState({current: <ChooseTeam />})
      // if (url === '/pro') return this.setState({current: <Pro current={Date.now()} />})
      // if (url === '/profile') return this.setState({current: <Profile current={Date.now()} />})
      // if (url === '/gdpr') return this.setState({current: <GDPR />})
      // if (url === '/tos') return this.setState({current: <TOS />})
      // if (/\/team/.test(url)) return this.setState({current: <Team />})
      // if (/\/analytics/.test(url)) return this.setState({current: <Analytics current={Date.now()} />})
      // if (/\/statistics/.test(url)) return this.setState({current: <Statistics current={Date.now()} />})
      // this.setState({current: <FouroFour />})
    })

    const popStateEvent = new window.PopStateEvent('popstate')
    popStateEvent.url = window.location.pathname
    window.dispatchEvent(popStateEvent)
  }

  render () {
    return <Layout currentUrl={this.state.currentUrl}>
      {this.state.current}
    </Layout>
  }
}
