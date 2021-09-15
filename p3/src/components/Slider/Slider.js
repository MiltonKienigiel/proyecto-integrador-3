import React, { Component } from "react";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        class="uk-position-relative uk-visible-toggle uk-light"
        tabindex="-1"
        uk-slideshow="ratio: false"
      >
        <ul
          class="uk-slideshow-items"
          uk-height-viewport="offset-top: true; offset-bottom: 30"
        >
          <li>
            <img src="./images/purple-galaxy-background.jpg" alt="" uk-cover />
          </li>
          <li>
            <img src="./images/purple-galaxy-background.jpg" alt="" uk-cover />
          </li>
          <li>
            <img src="./images/purple-galaxy-background.jpg" alt="" uk-cover />
          </li>
        </ul>

        <a
          class="uk-position-center-left uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-previous
          uk-slideshow-item="previous"
        ></a>
        <a
          class="uk-position-center-right uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-next
          uk-slideshow-item="next"
        ></a>
      </div>
    );
  }
}

export default Slider;
