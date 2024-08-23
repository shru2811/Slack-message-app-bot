import { WebClient } from '@slack/web-api';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const client = new WebClient(process.env.SLACK_BOT_TOKEN);

    try {
      const result = await client.chat.postMessage({
        channel: 'C07J2EJT38E', // Replace with your channel name or ID
        text: 'Hello, I am SlackMessageBot! How Are you?',
      });

      res.status(200).json({ success: true, result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to send message' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}