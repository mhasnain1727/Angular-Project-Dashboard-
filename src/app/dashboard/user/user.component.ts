import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    this.loadImage();
  }

  ngOnInit(): void {}

  val: string = '';
  url = './assets/images/profile.png';

  // user_data: Object;
  user_data = this.authService.registerdUserData;

  index: number = this.authService.indexValue;

  name = this.user_data[this.index].name;
  mobile = this.user_data[this.index].mobile;
  email = this.user_data[this.index].email;
  address = this.user_data[this.index].address.city;
  house_no = this.user_data[this.index].address.house_no;
  street = this.user_data[this.index].address.street;
  city = this.user_data[this.index].address.city;
  zip = this.user_data[this.index].address.zip;
  state = this.user_data[this.index].address.state;
  password = this.user_data[this.index].password;

  loadImage() {
    if (localStorage.getItem(this.email)) {
      this.url = JSON.parse(localStorage.getItem(this.email));
    }
  }

  edit: boolean = false;
  isUpdated: boolean = false;
  flag: boolean = true;
  editImg: boolean = false;

  onEdit() {
    this.edit = true;
  }

  onSubmit() {
    this.isUpdated = true;
    localStorage.removeItem('dash_key');

    if (this.flag) {
      const oldRecords = localStorage.getItem('user_data');
      const userList = JSON.parse(oldRecords);
      userList[this.index].name = this.name;
      userList[this.index].mobile = this.mobile;
      userList[this.index].email = this.email;
      userList[this.index].password = this.password;
      localStorage.setItem('user_data', JSON.stringify(userList));

      setTimeout(() => {
        this.router.navigateByUrl('login');
      }, 2000);
    }
  }

  onImageSelected(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      // console.log(reader.result);
      this.val = JSON.stringify(reader.result);
      localStorage.setItem(this.email, this.val);
    };
  }
}
