import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import {
  AuthClinicDto,
  ConfirmCodeResetPasswordDto,
  ResetPasswordDto,
} from './dtos/auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createAuthDto: AuthClinicDto,
  ) {
    const data = await this.authService.login(createAuthDto);

    res.status(HttpStatus.OK).json({ data });
  }

  @Post('/confirm-code-reset-password')
  public async confirmCodeResetPassword(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createConfirmCodeResetPasswordDto: ConfirmCodeResetPasswordDto,
  ) {
    const data = await this.authService.confirmCodeResetPassword(
      createConfirmCodeResetPasswordDto,
    );

    res.status(HttpStatus.OK).json({ data });
  }

  @Post('/send-reset-password')
  public async resetPassword(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createResetPasswordDto: ResetPasswordDto,
  ) {
    const data = await this.authService.resetPassword(createResetPasswordDto);

    res.status(HttpStatus.OK).json({ data });
  }
}
