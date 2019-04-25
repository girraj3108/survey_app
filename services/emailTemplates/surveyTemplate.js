const keys = require('../../config/keys');

module.exports = survey => {
  //  return '<div>' + survey.body + '</div>';

  return `
   <html>
      <body>
          <div style="text-align: center;">
              <h3> love your review </h3>
              <p> please answer the following question</p>
              <p>${survey.body}</p>
              <div>
              <a href="${keys.redirectDomain}/api/surveys/${
    survey.id
  }/yes">Yes</a>
              </div>
              <div>
              <a href="${keys.redirectDomain}/api/surveys/${
    survey.id
  }/no">No</a>
              </div>
          </div>
      </body>
   </html>
  `;
};
