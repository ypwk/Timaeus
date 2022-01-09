import PropTypes from "prop-types";
import React, { Component } from "react";
import "../css/RadioButton.css";

export class RadioButton extends Component {
  state = {};

  render() {
    const { selected, onChange, text, value } = this.props;
    return (
      <div
        className="modern-radio-container"
        onClick={() => {
          onChange(value);
        }}
      >
        <div
          className={`radio-outer-circle ${value !== selected && "unselected"}`}
        >
          <div
            className={`radio-inner-circle ${value !== selected &&
              "unselected-circle"}`}
          />
        </div>
        <div className="helper-text">{text}</div>
      </div>
    );
  }
}

RadioButton.propTypes = {
  text: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};