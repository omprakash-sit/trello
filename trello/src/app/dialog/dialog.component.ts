import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  trelloForm: FormGroup;
  cardForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if (this.data.label === 'Add List') {
      this.trelloForm = new FormGroup({
        title: new FormControl('', Validators.required)
      });
    } else if (this.data.label === 'Add Card') {
      this.cardForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
      });
    }
  }

}
