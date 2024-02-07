const Certificate = require("../../model/Certificate");
const Event = require("../../model/Event");

// const sendVerification = async (email, cerLink, name) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_ID,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//     const mailOptions = {
//       from: process.env.EMAIL_ID,
//       to: email,
//       subject: "CONGRATULATIONS YOU RECEIVED A CERTIFICATE",
//       html: `<!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8">
//         <title>Congratulations!</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             background-color: #f2f2f2;
//             margin: 0;
//             padding: 0;
//           }
//           .container {
//             max-width: 600px;
//             margin: 0 auto;
//             padding: 20px;
//             background-color: #ffffff;
//             box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//           }
//           h1 {
//             color: #333333;
//             font-size: 24px;
//           }
//           p {
//             color: #666666;
//             font-size: 16px;
//             line-height: 1.5;
//           }
//           a {
//             display: inline-block;
//             margin-top: 10px;
//             padding: 10px 20px;
//             background-color: #007bff;
//             color: #ffffff;
//             text-decoration: none;
//             border-radius: 5px;
//           }
//           a:hover {
//             background-color: #0056b3;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <h1>Congratulations!</h1>
//           <p>Dear ${name},</p>
//           <p>Congratulations on your outstanding achievement! We are thrilled to present you with this beautifully designed certificate to commemorate your success:</p>
//           <!-- Replace 'YOUR_CERTIFICATE_LINK' with the actual link to the certificate -->
//           <a href="${cerLink}" download>Download Certificate</a>
//           <p>Feel free to download and share your certificate with pride.</p>
//           <p>Best regards,<br>SIH</p>
//         </div>
//       </body>
//       </html>`,
//     };
//     const info = await transporter.sendMail(mailOptions);
//     console.log(info);
//   } catch (err) {
//     console.log(err);
//   }
// };

// name: {
//       type: String,
//       required: true,
//     },
//     userId: {
//       type: Number,
//     },
//     grade: {
//       type: String,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     expirationAt: {
//       type: Date,
//     },
//     event: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Event",
//     },
const addCertificate = async (req, res) => {
  const { eventId, certificates } = req.body;
  const { id } = req.query;

  try {
    const event = await Event.findOne({ id: eventId });
    if (!event) {
      return res.sendStatus(404); //not-found
    }
    if (event.orgId !== id) {
      return res.sendStatus(401); //unauthorized
    }
    const template = event.template;
    const eventObjectId = event._id;

    const certificateList = certificates.map((certificate) => ({
      ...certificate,
      template,
      event: eventObjectId,
    }));

    await Certificate.insertMany(certificateList);
  } catch (err) {
    console.log(err);
  }
};

module.exports = addCertificate;
