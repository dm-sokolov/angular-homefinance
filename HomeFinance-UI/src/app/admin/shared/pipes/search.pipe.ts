import {Pipe, PipeTransform} from "@angular/core";
import {Operation} from "../../../shared/interfaces";

@Pipe({
  name: 'searchOperations'
})
export class SearchPipe implements PipeTransform {
  transform(operations: Operation[], search = ''): Operation[] {
    if (!search.trim()) {
      return operations
    }

    return operations.filter( operation => {
      return operation.title.toLowerCase().includes(search.toLowerCase())
    })
  }

}
