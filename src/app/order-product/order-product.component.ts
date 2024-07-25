import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-order-product',
  standalone: true,
  imports: [
    MatDialogClose,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    NgClass,
    NgIf
  ],
  templateUrl: './order-product.component.html',
  styleUrl: './order-product.component.css'
})
export class OrderProductComponent {

  globalData: { orderQuantity: number, };
  private Validators: any;


  constructor(private dialogRef: MatDialogRef<OrderProductComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { orderQuantity: number }) {
    this.globalData = data;
  }

  close(){
    this.dialogRef.close()
  }

  confirm(){
    this.dialogRef.close(this.globalData);
  }
}
