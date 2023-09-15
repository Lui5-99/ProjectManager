import nodemailer from 'nodemailer'

export const emailSignUp = async (data) => {
  const { email, name, token } = data
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const info = await transport.sendMail({
    from: '"Project manager" <accounts@projectmanager.com>',
    to: email,
    subject: "Project manager - Confirm your account",
    text: "Confirm your account in Project Manager",
    html: `<p>Hi, ${name} confirm your account</p>
          <p>Your account is almost ready, you just have to click on the following link:</p>
          <a href="${process.env.FRONTEND_URL}/confirmaccount/${token}">
            Confirm account
          </a>
          <p>If you didn't create this account, just ignore the message</p>`
  })
}

export const emailForgotpPassword = async (data) => {
  const { email, name, token } = data
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const info = await transport.sendMail({
    from: '"Project manager" <accounts@projectmanager.com>',
    to: email,
    subject: "Project manager - Reset your password",
    text: "Reset your password",
    html: `<p>Hi ${name}, you have requested to reset your password</p>
          <p>Follow the link below to reset your password:</p>
          <a href="${process.env.FRONTEND_URL}/forgotpassword/${token}">
            Reset password
          </a>
          <p>If you didn't requested to change password, just ignore the message</p>`
  })
}