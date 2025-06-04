import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  }

  test() {
    console.log('test');
  }
  async sendEmail(to: string, subject: string, text: string, html: string) {
    const msg = {
      to,
      from: 'kovzhenko.ua@gmail.com',
      subject,
      text,
      html,
    };

    try {
      const mail = await sgMail.send(msg);
      console.log(mail);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
