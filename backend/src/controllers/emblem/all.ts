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

@ApiTags('Emblem')
@ApiBearerAuth()
@Controller('emblem/all')
export class EmblemAllController {
  @Get()
  @ApiOperation({ summary: 'All emblems' })
  @ApiResponse({ status: 200, description: 'Emblems found' })
  async all(@Request() request): Promise<JsonResponses> {
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

    const emblems = await prisma.emblem.findMany();

    return {
      status: true,
      code: 200,
      message: 'Emblems found',
      data: emblems,
    };
  }
}
