// pages/api/captcha-verify.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Captcha token is missing.' });
  }

  console.log('Verifying captcha token:', token);
  // In a real application, you would send this token to the captcha provider's API
  // to verify its authenticity.
  const isTokenValid = true; // Placeholder for actual verification logic

  if (isTokenValid) {
    return res.status(200).json({ success: true, message: 'Captcha verified successfully.' });
  } else {
    return res.status(400).json({ success: false, message: 'Captcha verification failed.' });
  }
}
