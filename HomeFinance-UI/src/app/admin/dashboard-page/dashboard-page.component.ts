import { Component, OnInit } from '@angular/core';
import {OperationsService} from "../../shared/operations.service";
import {Operation} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

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
  deleteSubscription: Subscription
  searchStr: ''

  constructor(
    private operationsService: OperationsService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.operationsSubscription = this.operationsService.getAll().subscribe( operations => {
      this.operations = operations
    })
  }

  remove(id: string) {
    this.deleteSubscription = this.operationsService.remove(id).subscribe(() => {
      this.operations = this.operations.filter( operation => operation.id !== id)
      this.alertService.danger('Запись успешно удалена')
    })

  }

  ngOnDestroy() {
    if (this.operationsSubscription) {
      this.operationsSubscription.unsubscribe()
    }

    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe()
    }
  }

}
