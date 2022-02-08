// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'
import rateLimit from 'express-rate-limit'
import sgMail from '@sendgrid/mail'
import validator from 'validator'

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  // eslint-disable-next-line @typescript-eslint/ban-types
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const ipMiddleware = function (req: NextApiRequest) {
  const clientIp = requestIp.getClientIp(req)
  return clientIp
}

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per `window` (here, per 30 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: ipMiddleware,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body)
  // Check honeypot field value to see if it's empty

  await runMiddleware(req, res, limiter)

  const email = validator.isEmail(body.email)
    ? validator.normalizeEmail(body.email)
    : ''
  const message = validator.escape(body.message).trim()
  const name = validator.escape(body.name).trim()
  if (body.bot || !email || !message || !name) {
    res.status(400).json({
      status: 'fail',
      message: 'Bad request or missing fields',
    })
  } else {
    // Handle the request
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: process.env.EMAIL_TO, // Change to your recipient
      from: process.env.EMAIL_FROM, // Change to your verified sender
      subject: `Blog contact request from ${name} at ${email}`,
      text: `${message}`,
      html: `${message}`,
    }
    try {
      await sgMail.send(msg)
    } catch (error) {
      res.status(500).json({ error })
    }
    res.status(200).json({ message: 'Message successfully sent' })
  }
}
