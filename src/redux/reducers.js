/**
 * App Reducers
 */
import { combineReducers } from "redux";
import { reducer as modal } from "redux-modal";

// session
import {
  AuthReducer,
  RegisterReducer,
  ForgetPasswordReducer
} from "Ducks/session";

// accounting
import {
  // AccountingReducer,
  CreditNoteReducer,
  InvoiceReducer,
  PaymentReducer,
  QuotationReducer
} from "Ducks/accounting";

// crm
import {
  LeadReducer,
  CustomerReducer,
  AccountReducer,
  DealReducer,
  CrmFieldReducer,
  OnlinePaymentReducer
} from "Ducks/crm";

//cms
import {
  BannerReducer,
  FeaturedReducer,
  CarReducer,
  BlogReducer
} from "Ducks/cms";

//inventory
import {
  ProductReducer
} from "Ducks/inventory";



// Marketing
import { MailReducer } from "Ducks/marketing/mail";
import { CampaignReducer } from "Ducks/marketing/campaign";
import { TemplateReducer } from "Ducks/marketing/template";

// follow ups
import { FollowupReducer } from "Ducks/followUp";

//settings
import {
  UserManagementReducer,
  RolesReducer,
  WebsiteSettingsReducer,
  CommissionReducer
} from "Ducks/setting";

// system
import { ReportReducer } from "Ducks/report";
import { CalendarReducer } from "Ducks/calendar";
import { WidgetReducer } from "Ducks/widget";

// Call To Action
import { AnnouncementReducer } from "Ducks/CallToAction";

// Bookings
import { BookingReducer } from "Ducks/booking";

// Configurator
import { ConfiguratorReducer } from "Ducks/configurator";

// Rental
import { RentalReducer } from "Ducks/rental";

const reducers = combineReducers({
  sessionState: combineReducers({
    authState: AuthReducer,
    registerState: RegisterReducer,
    forgetPasswordState: ForgetPasswordReducer
  }),
  crmState: combineReducers({
    leadState: LeadReducer,
    customerState: CustomerReducer,
    accountState: AccountReducer,
    dealState: DealReducer,
    crmField: CrmFieldReducer,
    onlinepaymentState: OnlinePaymentReducer
  }),
  cmsState: combineReducers({
    bannerState: BannerReducer,
    featuredState: FeaturedReducer,
    carState: CarReducer,
    blogState: BlogReducer
  }),
  inventoryState: ProductReducer,
    
  accountingState: combineReducers({
    quotationState: QuotationReducer,
    invoiceState: InvoiceReducer,
    creditNoteState: CreditNoteReducer,
    paymentState: PaymentReducer
    // accountState: AccountingReducer
  }),
  marketingState: combineReducers({
    mailState: MailReducer,
    campaignState: CampaignReducer,
    templateState: TemplateReducer
  }),
  configuratorState: ConfiguratorReducer,
  followupState: FollowupReducer,
  announcementState: AnnouncementReducer,
  widgetState: WidgetReducer,
  reportState: ReportReducer,
  calendarState: CalendarReducer,
  usersState: UserManagementReducer,
  rolesState: RolesReducer,
  bookingState: BookingReducer,
  modal,
  webSettingsState: WebsiteSettingsReducer,
  commissionState: CommissionReducer,
  rentalState: RentalReducer
});

export default reducers;
