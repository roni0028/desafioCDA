import { Controller, Patch, Body, Param, Request } from '@nestjs/common';
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
@Controller('emblem/update/:id')
export class EmblemUpdateController {
  @Patch()
  @ApiOperation({ summary: 'Update emblem' })
  @ApiResponse({ status: 200, description: 'Emblem updated' })
  @ApiResponse({ status: 400, description: 'ID is required' })
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
  async update(
    @Param('id') id: number,
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

    if (!id) {
      return {
        status: false,
        code: 400,
        message: 'ID is required',
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

    const emblem = await prisma.emblem.update({
      where: {
        id,
      },
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
        code: 400,
        message: 'Emblem not found',
      };
    }

    return {
      status: true,
      code: 200,
      message: 'Emblem updated',
    };
  }
}
