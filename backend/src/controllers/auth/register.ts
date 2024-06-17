import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
// crypto-js
import * as CryptoJS from 'crypto-js';
const prisma = new PrismaClient();

@ApiTags('Auth')
@Controller('auth/register')
export class RegisterController {
  @Post()
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 200, description: 'Registration successful' })
  @ApiResponse({ status: 400, description: 'Email and password are required' })
  @ApiResponse({ status: 400, description: 'Email already exists' })
  @ApiResponse({ status: 500, description: 'Registration failed' })
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
  async register(@Body() body: User): Promise<JsonResponses> {
    if (!body.email || !body.password) {
      return {
        status: false,
        code: 400,
        message: 'Email and password are required',
      };
    }

    const userExists = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (userExists) {
      return {
        status: false,
        code: 400,
        message: 'Email already exists',
      };
    }

    let password = body.password;
    password = CryptoJS.HmacSHA256(
      password,
      String(process.env.CRIPTO_SECRET),
    ).toString(CryptoJS.enc.Hex);

    const user = await prisma.user.create({
      data: {
        username: '',
        email: body.email,
        password: password,
        avatar: '',
        status: 'Active',
        role: 'User',
        emblems: JSON.stringify([]),
      },
    });

    if (!user) {
      return {
        status: false,
        code: 500,
        message: 'Registration failed',
      };
    }

    return {
      status: true,
      code: 200,
      message: 'Registration successful',
    };
  }
}
