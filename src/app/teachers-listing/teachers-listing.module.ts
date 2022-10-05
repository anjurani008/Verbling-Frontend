import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersListingRoutingModule } from './teachers-listing-routing.module';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { MaterialModule } from '../shared/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CheckoutComponent } from './checkout/checkout.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { NgxMaskModule } from 'ngx-mask';
import {MatDialogModule} from '@angular/material/dialog';
import { RecurrenceEditorAllModule, ScheduleAllModule } from '@syncfusion/ej2-angular-schedule';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';
import { ToolbarAllModule, ContextMenuAllModule } from '@syncfusion/ej2-angular-navigations';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxAllModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { DatemodelComponent } from './datemodel/datemodel.component';
import { EjsCalendarComponent } from './ejs-calendar/ejs-calendar.component';
import { ReschedComponent } from './resched/resched.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [DatemodelComponent,TeacherDashboardComponent, TeacherDetailComponent, CheckoutComponent, EjsCalendarComponent, ReschedComponent],
  imports: [
    CommonModule,
    MatDialogModule, 
    TeachersListingRoutingModule,NgbModule,
    MaterialModule, 
    NgxSpinnerModule,
    ScheduleAllModule,
    RecurrenceEditorAllModule,
    TreeViewModule,
    DropDownListAllModule,
    NgMultiSelectDropDownModule,
    MultiSelectAllModule,
    NumericTextBoxAllModule,
    TooltipModule,
    TextBoxAllModule,
    MaskedTextBoxModule, UploaderAllModule,
    DatePickerAllModule,
    ToolbarAllModule, ContextMenuAllModule,
    TimePickerAllModule,
    DateTimePickerAllModule,
  
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormsModule,
    MatSliderModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgbModule
  ],
})
export class TeachersListingModule { }
