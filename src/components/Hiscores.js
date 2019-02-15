import React, { Component } from 'react';
import { Table } from 'antd';
import '../styles/Hiscores.css';

const { Column } = Table;

class Hiscores extends Component {

    getHiscoreUsers = () => {
        console.log(localStorage.getItem("Users"));
        this.setState({
            users: JSON.parse(localStorage.getItem("Users")).sort(function(a, b) {
                return b.score - a.score;
            })
        })
    }

    componentWillMount() {
        this.getHiscoreUsers();
    }

    render() {
        return(
            <React.Fragment>
                <div className='title'>
                    <div> Hiscores </div>
                </div>
                
                { this.state.users && this.state.users.length > 0 ? 
                <Table dataSource={this.state.users} style={{maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto'}} pagination={false} bordered>
                    <Column
                        title="Name"
                        dataIndex="name"
                        key="name"
                        align="center"
                    />
                    <Column
                        title="Score"
                        dataIndex="score"
                        key="score"
                        align="center"
                    />
                </Table> : <div class="title">No Hiscores Found!</div> }
            </React.Fragment>
        )
    }
}

export default Hiscores;