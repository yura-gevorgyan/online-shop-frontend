import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ConfigUtility {
  getDialogConfig() {
    return {
      display: 'block',
      width: '0',
      height: '0',
      position: {
        top: '-80vh',
        left: '28vw',
      },
      data: {message: 'Are you sure you want to delete?'}
    };
  }
}
