import { SessionsClient } from "@google-cloud/dialogflow";

const dialogflowClient = new SessionsClient({
  credentials: JSON.parse(process.env.GCP_CREDENTIALS!)
})
