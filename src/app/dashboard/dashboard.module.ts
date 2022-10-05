import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../shared/material/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatInputModule} from '@angular/material/input';
import { LanguageModalComponent } from './language-modal/language-modal.component';
import { ModalComponent } from './modal/modal.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlotmodalComponent } from './slotmodal/slotmodal.component';
import { TeacherdashboardComponent } from './teacherdashboard/teacherdashboard.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { EquipmentModalComponent } from './equipment-modal/equipment-modal.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { BookRescheduleModalComponent } from './book-reschedule-modal/book-reschedule-modal.component';
import { RecurrenceEditorAllModule, ScheduleAllModule } from '@syncfusion/ej2-angular-schedule';
import { ContextMenuAllModule, ToolbarAllModule, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { MaskedTextBoxModule, NumericTextBoxAllModule, TextBoxAllModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { DatePickerAllModule, DateTimePickerAllModule, TimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { MatSliderModule } from '@angular/material/slider';
import { NgxMaskModule } from 'ngx-mask';
@NgModule({
  declarations: [EquipmentModalComponent,DashboardComponent,ScheduleComponent, LanguageModalComponent, ModalComponent,SlotmodalComponent, TeacherdashboardComponent, StudentDashboardComponent, BookRescheduleModalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    NgxSpinnerModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    // NgbModalModule,
    CalendarModule.forRoot({
    provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatDialogModule, 
    MaterialModule, 
    NgxSpinnerModule,
    RecurrenceEditorAllModule,
    TreeViewModule,
    DropDownListAllModule,
    MultiSelectAllModule,
    NumericTextBoxAllModule,
    TooltipModule,
    TextBoxAllModule,
    MaskedTextBoxModule, UploaderAllModule,
    DatePickerAllModule,
    ToolbarAllModule, ContextMenuAllModule,
    TimePickerAllModule,
    DateTimePickerAllModule,
    FormsModule,
    MatSliderModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgbModule,
    ScheduleAllModule
  ],
  // entryComponents:[EquipmentModalComponent],
  providers: [DatePipe]
})
export class DashboardModule { }
