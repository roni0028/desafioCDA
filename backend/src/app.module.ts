import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import Controllers from './controllers';

@Module({
  imports: [],
  controllers: Controllers,
  providers: [AppService],
})
export class AppModule {}
