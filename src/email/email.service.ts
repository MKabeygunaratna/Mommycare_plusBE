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
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  // Send a detailed email alert for depression level
  async sendDepressionAlert(
    userId: string, 
    depressionLevel: string, 
    recipients: string[]
  ) {
    // Define level-specific content
    const levelInfo = this.getDepressionLevelInfo(depressionLevel);
    
    // Format date
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Build HTML email
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .header {
          background-color: ${levelInfo.color};
          color: white;
          padding: 10px 20px;
          border-radius: 5px 5px 0 0;
          margin-bottom: 20px;
        }
        .level-indicator {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .content {
          padding: 0 20px;
        }
        .section {
          margin-bottom: 15px;
        }
        .section-title {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #777;
          border-top: 1px solid #eee;
          padding-top: 10px;
        }
        .action-needed {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 10px;
          margin: 15px 0;
        }
        ul {
          margin-top: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>MommyCare Mental Health Alert</h2>
          <div class="level-indicator">Depression Level: ${depressionLevel}</div>
        </div>
        
        <div class="content">
          <p>Dear Healthcare Provider/Guardian,</p>
          
          <p>This is an automated alert from the MommyCare mental health monitoring system. Our system has detected a <strong>${depressionLevel}</strong> depression level for:</p>
          
          <div class="section">
            <div class="section-title">Alert Information:</div>
            <ul>
              <li><strong>Concerning:</strong> Your wife</li>
              <li><strong>Alert Date:</strong> ${currentDate}</li>
            </ul>
          </div>
          
          <div class="section">
            <div class="section-title">Depression Assessment:</div>
            <p>${levelInfo.description}</p>
          </div>
          
          <div class="action-needed">
            <div class="section-title">Recommended Actions:</div>
            <ul>
              ${levelInfo.recommendedActions.map(action => `<li>${action}</li>`).join('')}
            </ul>
          </div>
          
          <p>Please review this information and take appropriate steps according to your professional judgment and the patient's care plan.</p>
          
          <p>Thank you for your prompt attention to this matter.</p>
          
          <p>Sincerely,<br>The MommyCare Team</p>
          
          <div class="footer">
            <p>This is an automated message from the MommyCare System. Please do not reply directly to this email. For technical support, contact support@mommycare.com</p>
            <p>CONFIDENTIALITY NOTICE: This email contains confidential health information protected by law. If you received this in error, please delete it and notify us immediately.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    // Plain text alternative
    const textContent = `
MommyCare Mental Health Alert
Depression Level: ${depressionLevel}

Dear Healthcare Provider/Guardian,

This is an automated alert from the MommyCare mental health monitoring system. Our system has detected a ${depressionLevel} depression level for:

Patient Information:
- Concerning: Your wife
- Alert Date: ${currentDate}

Depression Assessment:
${levelInfo.description}



Recommended Actions:
${levelInfo.recommendedActions.map(action => `- ${action}`).join('\n')}

Please review this information and take appropriate steps according to your professional judgment and the patient's care plan.

Thank you for your prompt attention to this matter.

Sincerely,
The MommyCare Team

--
CONFIDENTIALITY NOTICE: This email contains confidential health information protected by law. If you received this in error, please delete it and notify us immediately.
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipients,
      subject: `MommyCare Alert: ${depressionLevel} Depression Level Detected`,
      text: textContent,
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Depression alert email sent successfully to: ${recipients.join(', ')}`);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  // Helper function to get information based on depression level
  private getDepressionLevelInfo(level: string) {
    const levelMap = {
      'Mild': {
        color: '#4CAF50', // Green
        description:         'Your wife is showing signs of mild depression. She may be experiencing some symptoms but is generally able to maintain daily activities. Continued monitoring is recommended.',
        recommendedActions: [
          'Consider scheduling a follow-up appointment within the next 2 weeks',
          'Gently encourage regular physical activity and social engagement',
          'Be mindful of changes in sleep patterns or appetite',
          'Consider suggesting supportive therapy options if symptoms persist'
        ]
      },
      'Moderate': {
        color: '#FF9800', // Orange
        description:         'Your wife is exhibiting moderate depression symptoms. Her daily functioning may be impacted, and she might be experiencing persistent feelings of sadness, changes in sleep or appetite, and decreased interest in activities.',
        recommendedActions: [
          'Schedule an evaluation within the next 5-7 days',
          'Review current treatment plan and consider adjustments',
          'Assess for any suicidal ideation',
          'Consider implementing a daily check-in system',
          'Evaluate need for therapy and/or medication'
        ]
      },
      'Severe': {
        color: '#F44336', // Red
        description:         'Your wife is showing signs of severe depression. This is a serious condition that significantly impacts daily functioning and may include symptoms such as persistent feelings of hopelessness, withdrawal from social activities, significant changes in sleep and appetite, and potentially suicidal thoughts.',
        recommendedActions: [
          'Immediate clinical assessment is recommended (within 24-48 hours)',
          'Evaluate for suicide risk and implement safety planning',
          'Consider urgent referral to mental health specialist',
          'Review and likely intensify current treatment approach',
          'Implement a daily monitoring system and support structure',
          'Consider whether hospitalization may be necessary if symptoms include suicidal ideation with plan or intent'
        ]
      },
      'Critical': {
        color: '#9C27B0', // Purple
        description:         'Your wife is experiencing critical levels of depression with potential immediate risk. This requires urgent attention as she may be experiencing severe symptoms including possible suicidal ideation or plans.',
        recommendedActions: [
          'Immediate psychiatric evaluation is necessary',
          'Ensure the patient is not left alone',
          'Contact emergency services if immediate danger is present',
          'Implement crisis intervention protocols',
          'Consider immediate hospitalization',
          'Notify all members of the care team'
        ]
      },
      'Default': {
        color: '#2196F3', // Blue
        description:         'Your wife has been flagged in our monitoring system. Please review her recent activity and check-ins to assess her current mental health status.',
        recommendedActions: [
          'Review recent patient activities and assessments',
          'Schedule a follow-up to evaluate current mental state',
          'Check compliance with any existing treatment plans',
          "Document this alert in the patient's records"
        ]
      }
    };

    return levelMap[level] || levelMap['Default'];
  }

  // Other email methods can be added here
}