import { Controller, Get, Render, Req } from '@nestjs/common';
import type { Request } from 'express';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Render('welcome')
  getWelcome(@Req() req: Request) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const docsUrl = `${baseUrl}/api/docs`;
    return { docsUrl };
  }
}
