import { createTransport } from 'nodemailer';
import { config } from "dotenv";

config(); // Load environment variables from .env file

export interface Email {
  subject?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  inquiryType?: string | null;
  phone?: string | null;
  message: string;
}

export class EmailService {
    async sendInquiryEmailNotification(email: Email): Promise<void> {

    email.subject = "New Contact Form Submission from";    
    await this.sendEmail(email);
  }

  private async sendEmail(email: Email): Promise<void> {
    try {
      const transporter = createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `${email.subject} ${email.firstName} ${email.lastName}`,
        html: `
          <h3>Contact Details</h3>
          <ul>
            <li>Name: ${email.firstName} ${email.lastName}</li>
            <li>Email: ${email.email}</li>
            <li>Inquiry Type: ${email.inquiryType ?? ''}</li>
            <li>Phone: ${email.phone ?? ''}</li>
          </ul>
          <h3>Message</h3>
          <p>${email.message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

export const email = new EmailService();