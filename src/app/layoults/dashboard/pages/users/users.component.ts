import { ChangeDetectorRef, Component } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UsereditformComponent } from './components/usereditfrom/usereditform.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'actions'];
  dataSource: User[] = [
    {
      id: 1,
      firstName: "Alejandro",
      lastName: "García",
      email: "alejandro_garcia@example.com",
      password: "123456789",
      role: "Estudiante",
    },
    {
      id: 2,
      firstName: "Valentina",
      lastName: "Rodriguez",
      email: "valentina_rodriguez@example.com",
      password: "123456789",
      role: "Estudiante",
    },
    {
      id: 3,
      firstName: "Sebastian",
      lastName: "Perez",
      email: "sebastian_perez@example.com",
      password: "123456789",
      role: "Profesor",
    }
  ];

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  onUserSubmitted(newUser: User): void {
    this.dataSource = [...this.dataSource, { ...newUser, id: new Date().getTime() }];
  }

  eliminarFila(usuario: User): void {
    const confirmMessage = `¿Estás seguro de que quieres eliminar a ${usuario.firstName} ${usuario.lastName}?`;

    this.confirmAndDelete(confirmMessage, () => {
      this.dataSource = this.dataSource.filter(item => item !== usuario);
      Swal.fire('Eliminado', 'La fila ha sido eliminada.', 'success');
    });
  }

  editarFila(usuario: User): void {
    const dialogRef = this.dialog.open(UsereditformComponent, {
      width: '400px',
      data: usuario
    });

    dialogRef.componentInstance.edited.subscribe((datosActualizados: User) => {
      const index = this.dataSource.findIndex(item => item.id === usuario.id);
      if (index !== -1) {
        this.dataSource = [...this.dataSource.slice(0, index), { ...this.dataSource[index], ...datosActualizados }, ...this.dataSource.slice(index + 1)];
        this.cdr.detectChanges();
        dialogRef.close();
      }
    });
  }

  private confirmAndDelete(message: string, onConfirm: () => void): void {
    Swal.fire({
      title: 'Confirmar Eliminación',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  }
}