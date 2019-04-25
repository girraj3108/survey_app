const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey); // sendgrid api objectt
    this.from_email = new helper.Email(
      'no-reply@serene-brushlands-90960.herokuapp.com'
    );
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    // built in function of Mail
    this.addContent(this.body);
    // enabling click tracking
    this.addClickTracking();
    this.addRecipients();
  }
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  //function to communicate with the sendgrid api
  async send() {
    // create the request
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON() // function defined by mail base class
    });
    const response = await this.sgApi.API(request); //send the request
    return response;
  }
}

module.exports = Mailer;
