import React from 'react';
import { connect } from 'react-redux';
import { turnOn, turnOff } from '../actions/index';

import './LightView.css';

const LightView = ({ spotlight, turnOn, turnOff }) => (
  <section className={spotlight ? 'on' : 'off'}>
    {spotlight ?
      <button type="button" onClick={turnOff}>
        Off
      </button> :
      <button type="button" onClick={() => turnOn({ spotlight: true })}>
        On
      </button>
    }
  </section>
);

const mapStateToProps = (state, ownProps) => ({
  spotlight: state.light.spotlight,
});

const mapDispatchToProps = {
  turnOn,
  turnOff,
}

const LightViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LightView);

export default LightViewContainer;
