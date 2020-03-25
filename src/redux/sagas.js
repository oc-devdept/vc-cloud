/**
 * Root Sagas
 */
import { all } from "redux-saga/effects";

// accounting
import {
  CreditNoteSaga,
  InvoiceSaga,
  PaymentSaga,
  QuotationSaga
} from "Ducks/accounting";

//  crm
import {
  LeadSaga,
  CustomerSaga,
  AccountSaga,
  DealSaga,
  CrmFieldSaga
} from "Ducks/crm";

// marketing
import { MailSaga, CampaignSaga, TemplateSaga } from "Ducks/marketing";

// Call To Actions
import { AnnouncementSaga } from "Ducks/CallToAction";

// follow ups
import { FollowupSaga } from "Ducks/followUp";

// settings
import {
  UserManagementSaga,
  RolesSaga,
  WebsiteSettingsSaga,
  CommissionSaga
} from "Ducks/setting";

// calendar
import { CalendarSaga } from "Ducks/calendar";

// session
import { ForgetPasswordSaga, RegisterSaga } from "Ducks/session";
import AuthSaga from "Ducks/session/auth/AuthSaga";

// reports
import { ReportSaga } from "Ducks/report";

// widgets
import { WidgetSaga } from "Ducks/widget";

// Booking
import { BookingSaga } from "Ducks/booking";

// Configurator
import { ConfiguratorSaga } from "Ducks/configurator";

export default function* rootSaga() {
  yield all([
    // Accounting
    CreditNoteSaga(),
    InvoiceSaga(),
    PaymentSaga(),
    QuotationSaga(),

    // CRM
    LeadSaga(),
    CustomerSaga(),
    AccountSaga(),
    DealSaga(),
    CrmFieldSaga(),

    // Marketing
    MailSaga(),
    CampaignSaga(),
    TemplateSaga(),

    // Follow ups
    FollowupSaga(),

    // Session
    AuthSaga(),
    ForgetPasswordSaga(),
    RegisterSaga(),

    // System
    ReportSaga(),
    WidgetSaga(),

    // Calendar
    CalendarSaga(),

    // Settings
    RolesSaga(),
    UserManagementSaga(),
    AnnouncementSaga(),
    WebsiteSettingsSaga(),
    CommissionSaga(),

    // Booking
    BookingSaga(),

    // Configurator
    ConfiguratorSaga()
  ]);
}
