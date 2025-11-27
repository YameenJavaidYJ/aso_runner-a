import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { auth } from './auth.config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @All('*')
  async handleAuth(@Req() req: Request, @Res() res: Response): Promise<void> {
    return auth.handler(req, res);
  }
}

