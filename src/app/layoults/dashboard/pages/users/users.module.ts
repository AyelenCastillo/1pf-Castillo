import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {MatTableModule} from '@angular/material/table';
import { UserformComponent } from './components/userform/userform.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { UsereditformComponent } from './components/usereditfrom/usereditform.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    UsersComponent,
    UserformComponent,
    UsereditformComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
