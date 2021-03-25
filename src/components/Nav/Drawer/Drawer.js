import React, {Component} from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import classes from './Drawer.module.scss'

const links = [1, 2, 3]

class Drawer extends Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a href="#s">link: {link}</a>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    )
  }
}

export default Drawer
