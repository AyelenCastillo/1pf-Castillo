import { Component } from '@angular/core';
import { User } from './models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role'];
  dataSource: User[] = [
    {
      id: 1,
      firstName: "Alejandro",
      lastName: "García",
      email: "alejandro_garcia@example.com",
      password:"123456789",
      role:"Estudiante",
    },
    {
      id: 2,
      firstName: "Valentina",
      lastName: "Rodriguez",
      email: "valentina_rodriguez@example.com",
      password:"123456789",
      role:"Estudiante",
    },
    {
      id: 3,
      firstName: "Sebastian",
      lastName: "Perez",
      email: "sebastian_perez@example.com",
      password:"123456789",
      role:"Profesor",
    }
  ];

  onUserSubmitted(ev: User): void{
   this.dataSource =[... this.dataSource, {...ev, id: new Date().getTime() }];
  } 
}
