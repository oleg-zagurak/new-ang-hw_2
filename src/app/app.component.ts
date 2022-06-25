import { Component, OnInit } from '@angular/core';

interface IUser {
  login: string;
  password: string;
  email: string;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private _editStatus = false;
  public login = '';
  public password ='';
  public email = '';
  private _userList: IUser[] = [];
  private _editIndex!: number;

  ngOnInit(): void {}
  createUser(): IUser {
    let user: IUser = {
      login: this.login,
      password: this.password,
      email: this.email
    }
    return user;
  }
  addUser(): void {
    if(this.login === '' || this.email === '' || this.password === '') return;
    let user: IUser = this.createUser();
    this._userList.push(user);
    this.reset()
  }
  reset(): void {
    this.login = this.password = this.email = '';
  }
  get userList(): IUser[] {
    return this._userList;
  }
  delete(index: number): void {
    if(this._editStatus) return;
    this._userList.splice(index, 1);
  }
  editUser(index: number): void{
    this.login = this._userList[index].login;
    this.password = this._userList[index].password;
    this.email = this._userList[index].email;
    this._editStatus = true;
    this._editIndex = index;
  }
  get editStatus(): boolean {
    return this._editStatus;
  }
  saveEditUser(): void{
    if(this.login === '' || this.email === '' || this.password === '') return;
    this._editStatus = !this._editStatus;
    let user = this.createUser();
    this._userList[this._editIndex] = user;
    this.reset()
  }
}
