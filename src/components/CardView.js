import React, { Component } from 'react';
import '../styles/Card.css';

class CardView extends Component {

  onClick = () => {
    if (!this.props.matched && !this.props.imageUp) {
      this.props.onClick(this.props.id,this.props.image);      
    }
  }

  render() {
    let imPath = './images/';
    if (this.props.imageUp) {
      imPath = imPath + this.props.image + '.jpg';
    } else {
      imPath = imPath + 'back.jpg';
    }

    let className='Card';
    if (this.props.matched) {
      className = className + ' Matched';
    }

    return (
        <img className={className} src={require(`${imPath}`)} alt='' onClick={this.onClick}/>
    );      
  };
};

export default CardView;
