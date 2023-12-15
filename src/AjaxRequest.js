// src/AjaxRequest.js

import React, { Component } from 'react';
import axios from 'axios';

class AjaxRequest extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <h2>Resultados de la petición Ajax:</h2>
        <ul>
          {this.state.data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AjaxRequest;
