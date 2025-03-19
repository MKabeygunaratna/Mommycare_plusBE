import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class EmailService {
  private transporter;


  constructor() {
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Loaded' : 'Missing');

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password (Use environment variables)
      },
      secure: false, // Set to false to allow non-secure connections
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
        },
    });
  }

  // Send an email alert for depression level
  async sendDepressionAlert(userId: string, depressionLevel: string, recipients: string[]) {
    const subject = 'Depression Level Alert';
    const message = `The user (ID: ${userId}) has been identified with a depression level of: ${depressionLevel}. Please take necessary actions.`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipients,
      subject,
      text: message,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Depression alert email sent successfully to: ${recipients.join(', ')}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
