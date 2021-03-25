import {Component} from 'react'
import classes from './Layout.module.scss'
import MenuToggle from '../../components/Nav/MenuToggle/MenuToggle'
import Drawer from '../../components/Nav/Drawer/Drawer'

class Layout extends Component {
  state = {
    menu: false,
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu,
    })
  }

  menuCloseHandler = () => {
    this.setState({
      menu: false,
    })
  }

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler} />

        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />

        <main>{this.props.children}</main>
      </div>
    )
  }
}

export default Layout
