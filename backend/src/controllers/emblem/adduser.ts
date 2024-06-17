import { Controller, Post, Body, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { verify } from 'jsonwebtoken';

@ApiBearerAuth()
@ApiTags('Emblem')
@Controller('emblem/add')
export class EmblemAddUserController {
  @Post()
  @ApiOperation({ summary: 'Add emblem to user' })
  @ApiResponse({ status: 200, description: 'Emblem added' })
  @ApiResponse({ status: 400, description: 'Emblem not found' })
  @ApiResponse({ status: 400, description: 'Emblem is disabled' })
  @ApiResponse({ status: 400, description: 'User not found' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Emblem ID',
        },
      },
    },
  })
  async Add(@Body() body: any, @Request() request): Promise<JsonResponses> {
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

    const emblem = await prisma.emblem.findFirst({
      where: {
        id: body.id,
      },
    });

    if (!emblem) {
      return {
        status: false,
        code: 400,
        message: 'Emblem not found',
      };
    }

    if (emblem.enabled === false) {
      return {
        status: false,
        code: 400,
        message: 'Emblem is disabled',
      };
    }

    const useremblem = JSON.parse(user.emblems);

    let found = false;
    useremblem.forEach((element) => {
      if (element.id == emblem.id) {
        found = true;
      }
    });

    if (found) {
      return {
        status: false,
        code: 400,
        message: 'Emblem already added',
      };
    }

    useremblem.push({
      id: emblem.id,
      slug: emblem.slug,
      name: emblem.name,
      image: emblem.image,
      category: emblem.category,
      time: Date.now(),
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emblems: JSON.stringify(useremblem),
      },
    });

    return {
      status: true,
      code: 200,
      message: 'Emblem added',
    };
  }
}
