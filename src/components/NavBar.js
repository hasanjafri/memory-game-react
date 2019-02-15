import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import History from './History';

class NavBar extends Component {
    state = {
        current: 'game'
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key
        }, () => {
            if (e.key === 'game') {
                History.push('/')
            } else if (e.key === 'hiscores') {
                History.push('/hiscores')
            } else {
                return;
            }
        });
    }

    render() {
        return (
            <Menu theme="dark" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="game">
                    <Icon type="play-circle" />
                    Play Game
                </Menu.Item>
                <Menu.Item key="hiscores">
                    <Icon type="ordered-list" />
                    Hiscores
                </Menu.Item>
            </Menu>
        )
    }
}

export default NavBar;