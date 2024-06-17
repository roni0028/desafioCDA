import { Controller, Delete, Param, Request } from '@nestjs/common';
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
@Controller('emblem/delete/:id')
export class EmblemDeleteController {
  @Delete()
  @ApiOperation({ summary: 'Delete emblem' })
  @ApiResponse({ status: 200, description: 'Emblem deleted' })
  @ApiResponse({ status: 400, description: 'ID is required' })
  @ApiResponse({ status: 400, description: 'Emblem not found' })
  async delete(
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

    if (user.role !== 'Admin') {
      return {
        status: false,
        code: 400,
        message: 'Unauthorized',
      };
    }

    if (!id) {
      return {
        status: false,
        code: 400,
        message: 'ID is required',
      };
    }

    const emblem = await prisma.emblem.delete({
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
      message: 'Emblem deleted',
    };
  }
}
