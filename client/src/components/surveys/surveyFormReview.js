import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './FormFields';

import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h4> please confirm your entries</h4>
      {reviewFields}
      <button className="yellow darken-3  btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.SurveyForm.values
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
