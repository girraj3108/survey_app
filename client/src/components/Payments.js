import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    //    debugger;
    return (
      <StripeCheckout
        name="3+1=31"
        description="add money to wallet"
        amount={500}
        //token={token => console.log(token)}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">ADD MONEY</button>
      </StripeCheckout>
    );
  }
}
export default connect(
  null,
  actions
)(Payments);
