import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';
import { UserContextModule } from './user-context/user-context.module';
import { RidersModule } from './riders/riders.module';
import { RiderDocumentsModule } from './rider-documents/rider-documents.module';
import { RiderVerificationModule } from './rider-verification/rider-verification.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { VehicleTypesModule } from './vehicle-types/vehicle-types.module';
import { RiderServiceZonesModule } from './rider-service-zones/rider-service-zones.module';
import { RiderAvailabilityModule } from './rider-availability/rider-availability.module';
import { RiderLocationsModule } from './rider-locations/rider-locations.module';
import { RiderEarningsModule } from './rider-earnings/rider-earnings.module';
import { RiderPayoutsModule } from './rider-payouts/rider-payouts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    AuthModule,
    UsersModule,
    UserRolesModule,
    UserProfilesModule,
    UserContextModule,
    RidersModule,
    RiderDocumentsModule,
    RiderVerificationModule,
    VehiclesModule,
    VehicleTypesModule,
    RiderServiceZonesModule,
    RiderAvailabilityModule,
    RiderLocationsModule,
    RiderEarningsModule,
    RiderPayoutsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

