// Config
import 'modules/app/config/app.config';
// Node modules
import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CacheModule } from 'nestjs-omacache';
import { RateLimiterModule } from 'nestjs-rate-limiter';
// APP Modules
// import { DBModule } from 'modules/db/db.module';
// import { AuthModule } from 'modules/auth/auth.module';
// import { UsersModule } from 'modules/users/user.module';
// import { AccessModule } from 'modules/access/access.module';
// import { ProfileModule } from 'modules/profiles/profiles.module';
// import { SettingsModule } from 'modules/settings/settings.module';
// Controllers
import { AppController } from './controllers/app.controller';
// Services
import { AppService } from './services/app.service';

@Module({
  imports: [
    Reflector,
    // DBModule,
    CacheModule,
    RateLimiterModule,
    // AuthModule,
    // UsersModule,
    // AccessModule,
    // ProfileModule,
    // SettingsModule,
  ],
  controllers: [AppController],
  providers: [Reflector, AppService],
})
export class AppModule {}
