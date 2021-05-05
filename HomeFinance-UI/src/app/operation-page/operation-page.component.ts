import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {OperationsService} from "../shared/operations.service";
import {Observable} from "rxjs";
import {Operation} from "../shared/interfaces";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-operation-page',
  templateUrl: './operation-page.component.html',
  styleUrls: ['./operation-page.component.scss']
})
export class OperationPageComponent implements OnInit {

  operation$: Observable<Operation>

  constructor(
    private route: ActivatedRoute,
    private operationsService: OperationsService
  ) { }

  ngOnInit(): void {
    this.operation$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.operationsService.getById(params['id'])
        })
      )
  }

}
