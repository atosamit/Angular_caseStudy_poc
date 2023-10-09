import { Component } from '@angular/core';
import { labelConstants } from '../HardcodeTags';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  labelConstants = labelConstants;
  tablesData: any[] = [
    // Define your table data arrays
    [
      [1,'Alfreds Futterkiste', 'Maria Anders', 'Germany', 'Maria Anders'],
      [2,'jgyhjg', 'Maria jgj', 'Gerghkjhmany',  'Maria Anders'],

      [3,'Alfreds Futterkiste', 'Maria Anders',   'Maria Anders','Maria Anders'],
      [ 4,'jgyhjg', 'Maria jgj', 'Gerghkjhmany',  'Maria Anders',],
      // Add more rows as needed
    ],
    // Add more tables as needed
  ];
  tableHeaders: string[] = ['', 'Name', 'Last Name', 'Email address',  'Action'];


  
}
