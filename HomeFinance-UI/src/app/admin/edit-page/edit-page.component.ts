import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {OperationsService} from "../../shared/operations.service";
import {switchMap} from "rxjs/operators";
import {Operation} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form: FormGroup

  constructor(
    private route: ActivatedRoute,
    private operationsService: OperationsService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.operationsService.getById(params['id'])
      })
    ).subscribe((operation: Operation) => {
      this.form = new FormGroup({
        title: new FormControl(operation.title, Validators.required),
        text: new FormControl(operation.text, Validators.required)
      })

    })
  }

  submit() {

  }
}
