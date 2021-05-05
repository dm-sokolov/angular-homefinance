import {Component, Input, OnInit} from '@angular/core';
import {Operation} from "../../interfaces";

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {

  @Input() operation: Operation

  constructor() { }

  ngOnInit(): void {
  }

}
