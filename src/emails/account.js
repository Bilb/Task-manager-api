const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'audric.ackermann@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the App, ${name}. Let me know how you get along with the app.`
    })
}

const sendFarewellEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'audric.ackermann@gmail.com',
        subject: 'Goodbye from our app!',
        text: 'Is there anything we could do to keep you?'
    })
}

module.exports = {
    sendWelcomeEmail,
    sendFarewellEmail
}