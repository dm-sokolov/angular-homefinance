import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {OperationsService} from "../../shared/operations.service";
import {switchMap} from "rxjs/operators";
import {Operation} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  operation: Operation
  isSubmitted: boolean = false
  updateSubscription: Subscription

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
      this.operation = operation
      this.form = new FormGroup({
        title: new FormControl(operation.title, Validators.required),
        text: new FormControl(operation.text, Validators.required)
      })

    })
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe()
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.isSubmitted = true

    this.updateSubscription = this.operationsService.update({
      ...this.operation,
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe(()=> {
      this.isSubmitted = false
    })
  }
}
