import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'

export default class Navbar extends React.Component {
  render() {
    return (
      <Toolbar style={{opacity: .7}}>
        <ToolbarTitle text="Denver Pongboard" className="toolbar-title" onClick={_ => {window.location = '/'}}/>
        <ToolbarGroup>
          <FlatButton label="About" primary={this.currentPage() == 'about'} onClick={_ => {window.location = '/about'}}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  currentPage() {
    switch (window.location.pathname) {
      case '/paintings':
        return 'paintings'
      case '/cards':
        return 'cards'
      case '/custom_works':
        return 'custom_works'
      case '/contact':
        return 'contact'
      default:
        return 'unknown'
    }
  }
}