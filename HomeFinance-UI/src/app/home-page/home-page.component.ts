import { Component, OnInit } from '@angular/core';
import {OperationsService} from "../shared/operations.service";
import {Observable} from "rxjs";
import {Operation} from "../shared/interfaces";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  operations$: Observable<Operation[]>

  constructor(
    private operationsService: OperationsService
  ) { }

  ngOnInit(): void {
    this.operations$ = this.operationsService.getAll()
  }

}
