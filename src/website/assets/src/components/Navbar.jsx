import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'

export default class Navbar extends React.Component {
  render() {
    return (
      <Toolbar style={{opacity: .7}}>
        <ToolbarTitle text="Hanna Schulz Painting" className="toolbar-title" onClick={_ => {window.location = '/'}}/>
        <ToolbarGroup>
          <FlatButton label="Paintings" primary={this.currentPage() == 'paintings'} onClick={_ => {window.location = '/paintings'}}/>
          <FlatButton label="Cards" primary={this.currentPage() == 'cards'} onClick={_ => {window.location = '/cards'}}/>
          <FlatButton label="Custom Orders" primary={this.currentPage() == 'custom_works'} onClick={_ => {window.location = '/custom_works'}}/>
          <FlatButton label="Contact" primary={this.currentPage() == 'contact'} onClick={_ => {window.location = '/contact'}}/>
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