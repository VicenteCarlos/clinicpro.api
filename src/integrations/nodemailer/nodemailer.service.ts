import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import { Transporter, SendMailOptions, SentMessageInfo } from 'nodemailer';

interface CustomMailOptions extends Omit<SendMailOptions, 'html' | 'subject'> {
  subject?: string;
  templateVariables?: { [key: string]: string };
}

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get('NODEMAILER_USER'),
        pass: this.configService.get('NODEMAILER_PASSWORD'),
      },
    });
  }

  async sendMail(options: CustomMailOptions): Promise<SentMessageInfo> {
    let html = fs.readFileSync(
      'src/integrations/nodemailer/index.html',
      'utf8',
    );

    // Replace template variables if provided
    if (options.templateVariables) {
      Object.keys(options.templateVariables).forEach(key => {
        const placeholder = `{{${key}}}`;
        html = html.replace(new RegExp(placeholder, 'g'), options.templateVariables![key]);
      });
    }

    const mailOptions = {
      from: 'ClinicPro <your_email@example.com>',
      to: "vicentecarloshehe@gmail.com",
      subject: options.subject || 'ClinicPro - Notificação',
      html,
      text: options.text,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
