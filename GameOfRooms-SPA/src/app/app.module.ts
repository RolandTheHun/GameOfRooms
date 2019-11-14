import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BsDropdownModule,
  TabsModule,
  BsDatepickerModule,
  PaginationModule,
  TimepickerModule
} from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { UserService } from './_services/user.service';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { AuthGuard } from './_guards/auth.guard';
import { AlertifyService } from './_services/alertify.service';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { TimeAgoPipe } from 'time-ago-pipe';
import { ReservationListComponent } from './reservations/reservation-list/reservation-list.component';
import { ReservationListResolver } from './_resolvers/reservation-list.resolver';
import { RatingListComponent } from './ratings/rating-list/rating-list.component';
import { RatingListResolver } from './_resolvers/rating-list.resolver';
import { RoomListResolver } from './_resolvers/room-list.resolver';
import { ReservationDetailComponent } from './reservations/reservation-detail/reservation-detail.component';
import { ConsultantListResolver } from './_resolvers/consultant-list.resolver';
import { RatingDetailComponent } from './ratings/rating-detail/rating-detail.component';
import { SignUpComponent } from './reservations/sign-up/sign-up.component';
import { RatingAddComponent } from './ratings/rating-add/rating-add.component';
import { ReservationAddComponent } from './reservations/reservation-add/reservation-add.component';
import { ReservationAddGuard } from './_guards/reservation-add.guard';
import { ReservationEditComponent } from './reservations/reservation-edit/reservation-edit.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    TimeAgoPipe,
    ReservationListComponent,
    ReservationDetailComponent,
    ReservationAddComponent,
    ReservationEditComponent,
    SignUpComponent,
    RatingListComponent,
    RatingDetailComponent,
    RatingAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    UserService,
    ErrorInterceptorProvider,
    AuthGuard,
    ReservationAddGuard,
    AlertifyService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChanges,
    ReservationListResolver,
    RatingListResolver,
    ConsultantListResolver,
    RoomListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
