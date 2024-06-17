/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Patch, Body, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { verify } from 'jsonwebtoken';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user/update')
export class UserUpdateController {
  @Patch()
  @ApiOperation({ summary: 'Update User Data' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 400, description: 'User not found' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
        },
        avatar: {
          type: 'string',
        },
        bio: {
          type: 'string',
        },
      },
    },
  })
  async update(@Body() body: User, @Request() request): Promise<JsonResponses> {
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

    const emblems = JSON.parse(user.emblems);

    const newUser = {
      id: user.id,
      username: body.username == null ? user.username : body.username,
      bio: body.bio == null ? user.bio : body.bio,
      email: user.email,
      password: user.password,
      avatar: body.avatar == null ? user.avatar : body.avatar,
      createdAt: user.createdAt,
      updatedAt: new Date(),
      status: user.status,
      role: user.role,
      emblems: JSON.stringify(emblems),
    };

    const updatedUser = await prisma.user.update({
      where: {
        id: decoded['id'],
      },
      data: {
        ...newUser,
      },
    });

    return {
      status: true,
      code: 200,
      message: 'User updated',
      data: updatedUser,
    };
  }
}
