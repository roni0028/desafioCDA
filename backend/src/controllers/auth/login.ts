import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import * as CryptoJS from 'crypto-js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { sign } from 'jsonwebtoken';

@ApiTags('Auth')
@Controller('auth/login')
export class LoginController {
  @Post()
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 400, description: 'Invalid email or password' })
  @ApiResponse({ status: 500, description: 'Login failed' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })
  async login(@Body() body: Auth): Promise<JsonResponses> {
    if (!body.email || !body.password) {
      return {
        status: false,
        code: 400,
        message: 'Email and password are required',
      };
    }

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    let password = body.password;
    password = CryptoJS.HmacSHA256(
      password,
      String(process.env.CRIPTO_SECRET),
    ).toString(CryptoJS.enc.Hex);

    if (user && user.password !== password) {
      return {
        status: false,
        code: 400,
        message: 'Invalid email or password',
      };
    } else if (!user) {
      return {
        status: false,
        code: 400,
        message: 'Invalid email or password',
      };
    }

    const token = sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      'secretkey',
    );

    if (!token) {
      return {
        status: false,
        code: 500,
        message: 'Login failed',
      };
    }

    return {
      status: true,
      code: 200,
      message: 'Login successful',
      token,
    };
  }
}
