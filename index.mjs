import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const port = 7797;

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sendtomail777999@gmail.com",
    pass: "knsdtrlcatfppakf",
  },
});

app.post("/mail/send-email", async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).send("Incomplete data provided");
    }

    const mailOptions = {
      from: "sendtomail777999@gmail.com",
      to: "info@duyelidepe.com",
      subject: "New Contact Form Submission",
      text: `
        Full Name: ${fullName}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);

    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
