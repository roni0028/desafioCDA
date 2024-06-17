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
@Controller('emblem/create')
export class EmblemCreateController {
  @Post()
  @ApiOperation({ summary: 'Create emblem' })
  @ApiResponse({ status: 200, description: 'Emblem created' })
  @ApiResponse({ status: 400, description: 'Slug is required' })
  @ApiResponse({ status: 400, description: 'Name is required' })
  @ApiResponse({ status: 400, description: 'Image is required' })
  @ApiResponse({ status: 400, description: 'Category is required' })
  @ApiResponse({ status: 400, description: 'Invalid category' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        image: {
          type: 'string',
        },
        category: {
          type: 'string',
        },
        enabled: {
          type: 'boolean',
        },
      },
    },
  })
  async create(
    @Body() body: Emblems,
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

    if (!body.slug) {
      return {
        status: false,
        code: 400,
        message: 'Slug is required',
      };
    }

    if (!body.name) {
      return {
        status: false,
        code: 400,
        message: 'Name is required',
      };
    }

    if (!body.image) {
      return {
        status: false,
        code: 400,
        message: 'Image is required',
      };
    }

    if (!body.category) {
      return {
        status: false,
        code: 400,
        message: 'Category is required',
      };
    }

    if (
      body.category !== 'Bronze' &&
      body.category !== 'Silver' &&
      body.category !== 'Gold'
    ) {
      return {
        status: false,
        code: 400,
        message: 'Invalid category',
      };
    }

    if (body.enabled == null) body.enabled = true;

    const emblem = await prisma.emblem.create({
      data: {
        slug: body.slug,
        name: body.name,
        image: body.image,
        category: body.category,
        enabled: body.enabled,
      },
    });

    if (!emblem) {
      return {
        status: false,
        code: 500,
        message: 'Emblem creation failed',
      };
    }

    return {
      status: true,
      code: 200,
      message: 'Emblem created',
      data: emblem,
    };
  }
}
