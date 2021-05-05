import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Operation} from "../../shared/interfaces";
import {OperationsService} from "../../shared/operations.service";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private operationsService: OperationsService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const operation: Operation = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    }

    this.operationsService.create(operation).subscribe(()=> {
      this.form.reset()
      this.alertService.success('Операция была создана')
    })

  }

}
