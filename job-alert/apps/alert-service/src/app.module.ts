import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import config from './config/config';
import { DatabaseModule } from './modules/db/db.module';
import { JobModule } from './modules/job/job.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { JobSubscriptionModule } from './modules/job_subscription/job_subscription.module';
import { NotificationModule } from './modules/notification/notification.module';
import { CompanyModule } from './modules/company/company.module';
import { JobAlertModule } from './modules/job_alert/job_alert.module';

@Module({
  imports: [
    /* Your imported modules */
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    UserModule,
    DatabaseModule,
    JobModule,
    KafkaModule,
    JobSubscriptionModule,
    NotificationModule,
    CompanyModule,
    JobAlertModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure() {}
}
