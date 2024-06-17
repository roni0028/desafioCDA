import { Controller, Get, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { verify } from 'jsonwebtoken';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user/get')
export class UserGetController {
  @Get()
  @ApiOperation({ summary: 'Get User Data' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 400, description: 'User not found' })
  async get(@Request() request): Promise<JsonResponses> {
    const token = request.headers['authorization'].replace('Bearer ', '');
    const decoded = verify(token as string, 'secretkey');
    const user = await prisma.user.findFirst({
      where: {
        id: decoded['id'],
      },
    });

    if (!user) {
      return {
        status: false,
        code: 400,
        message: 'User not found',
      };
    }

    delete user.password;
    user.emblems = JSON.parse(user.emblems);

    return {
      status: true,
      code: 200,
      message: 'User found',
      data: user,
    };
  }
}
