import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Or use SMTP settings for your email provider
      auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-email-password', // Use an App Password if using Gmail
      },
    });
  }

  async sendDepressionAlert(to: string[], subject: string, message: string) {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: to.join(', '), // Send to multiple recipients
      subject: subject,
      text: message,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
