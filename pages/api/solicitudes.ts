// pages/api/solicitudes.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { solicitudSchema } from "../../lib/schemas";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const parse = solicitudSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error });
  }

  // For now, just log the data
  console.log('Received valid solicitud:', parse.data);

  // In a real application, you would persist this data to a database
  // and send a notification email.

  return res.status(200).json({ ok: true, id: 'dummy-uuid-123' });
}
