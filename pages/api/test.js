const dialogflow = require('@google-cloud/dialogflow')
const uuid = require('uuid')
const credentials = require('../../dialogflowcreds.json')

export default async function handler(req, res) {
  // A unique identifier for the given session
  const sessionId = uuid.v4()

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    credentials: credentials,
  })
  const sessionPath = sessionClient.projectAgentSessionPath(
    process.env.PROJECT_ID,
    sessionId
  )

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: 'hi',
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  }

  // Send request and log result
  const responses = await sessionClient.detectIntent(request)

  const result = responses[0].queryResult

  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`)
    res.status(200).json({ message: 'Message successfully sent' })
  } else {
    console.log(`  No intent matched.`)
  }
  return result
}
