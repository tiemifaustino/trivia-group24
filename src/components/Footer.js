import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <p>Developed by:</p>
        <div className="group-links">
          <a title="GitHub" href="https://github.com/eggersss">Alexandre Eggers</a>
          <a title="GitHub" href="https://github.com/EduMLAlmeida">Eduardo Almeida</a>
          <a title="GitHub" href="https://github.com/lalanametala">Laís Nametala</a>
          <a title="GitHub" href="https://github.com/tiemifaustino">Tiemi Faustino</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
