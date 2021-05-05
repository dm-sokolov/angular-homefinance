import { Component, OnInit } from '@angular/core';
import {OperationsService} from "../../shared/operations.service";
import {Operation} from "../../shared/interfaces";
import {Subscription} from "rxjs";

interface onDestroy {
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, onDestroy {

  operations: Operation[] = []
  operationsSubscription: Subscription

  constructor(private operationsService: OperationsService) { }

  ngOnInit(): void {
    this.operationsSubscription = this.operationsService.getAll().subscribe( operations => {
      this.operations = operations
    })
  }

  ngOnDestroy() {
    if (this.operationsSubscription) {
      this.operationsSubscription.unsubscribe()
    }
  }

  remove(id: string) {

  }
}
