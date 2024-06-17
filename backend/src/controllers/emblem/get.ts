import { Controller, Get, Param, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { verify } from 'jsonwebtoken';

@ApiBearerAuth()
@ApiTags('Emblem')
@Controller('emblem/get/:id')
export class EmblemGetController {
  @Get()
  @ApiOperation({ summary: 'Get emblem' })
  @ApiResponse({ status: 200, description: 'Emblem found' })
  @ApiResponse({ status: 400, description: 'ID is required' })
  @ApiResponse({ status: 400, description: 'Emblem not found' })
  async get(
    @Param('id') id: number,
    @Request() request,
  ): Promise<JsonResponses> {
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

    if (!id) {
      return {
        status: false,
        code: 400,
        message: 'ID is required',
      };
    }

    const emblem = await prisma.emblem.findUnique({
      where: {
        id,
      },
    });

    if (!emblem) {
      return {
        status: false,
        code: 400,
        message: 'Emblem not found',
      };
    }

    return {
      status: true,
      code: 200,
      message: 'Emblem found',
      data: emblem,
    };
  }
}
