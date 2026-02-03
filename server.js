import express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import { saveInvite, getInvite, markYes } from "./data.js";
import { sendInvite, sendYesNotice } from "./mailer.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/send", async (req, res) => {
  const { senderName, senderEmail, receiverName, receiverEmail, message } = req.body;
  const id = uuid();
  saveInvite(id, {
    senderName,
    senderEmail,
    receiverName,
    receiverEmail,
    message,
    createdAt: new Date(),
  });
  const link = `${process.env.FRONTEND_URL}/valentine/${id}`;

  try {
    await sendInvite({ senderName, senderEmail, receiverName, receiverEmail, link });
  } catch (err) {
    console.error("Invite email failed", err);
  }

  res.json({ id, link });
});

app.get("/api/valentine/:id", (req, res) => {
  const invite = getInvite(req.params.id);
  if (!invite) return res.status(404).json({ error: "Not found" });
  res.json(invite);
});

app.post("/api/valentine/:id/yes", async (req, res) => {
  const invite = markYes(req.params.id);
  if (!invite) return res.status(404).json({ error: "Not found" });
  const timestamp = invite.answeredAt.toISOString();

  try {
    await sendYesNotice({
      senderName: invite.senderName,
      senderEmail: invite.senderEmail,
      receiverName: invite.receiverName,
      timestamp,
    });
  } catch (err) {
    console.error("YES notification failed", err);
  }

  res.json({ ok: true, timestamp });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API listening on ${port}`);
});
