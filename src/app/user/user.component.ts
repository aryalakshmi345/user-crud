import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  user: User = { name: '', email: '' };
  isEdit = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  addUser(): void {
    if (this.user.name && this.user.email) {
      this.userService.addUser(this.user).subscribe(newUser => {
        this.users.push(newUser);
        this.user = { name: '', email: '' };
      });
    }
  }

  editUser(user: User): void {
    this.user = { ...user };
    this.isEdit = true;
  }

  updateUser(): void {
    if (this.user.id) {
      this.userService.updateUser(this.user).subscribe(updatedUser => {
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) this.users[index] = updatedUser;
        this.isEdit = false;
        this.user = { name: '', email: '' };
      });
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id);
    });
  }

  cancelEdit(): void {
    this.isEdit = false;
    this.user = { name: '', email: '' };
  }
}
