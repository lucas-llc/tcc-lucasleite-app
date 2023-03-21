import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { SignatureService } from 'src/app/services/signature/signature.service';

@Component({
  selector: 'app-signature-popover',
  templateUrl: './signature-popover.page.html',
  styleUrls: ['./signature-popover.page.scss'],
})
export class SignaturePopoverPage implements OnInit {

  statusList = [
    { value: 'ALL', label: 'Todas as tarefas' }, {value: 'OPENINPROGRESS', label: 'Tarefas abertas e em execução'}, {value: 'OPEN', label: 'Tarefas abertas'}, {value: 'INPROGRESS', label: 'Tarefas execução'}, {value: 'FINISHED', label: 'Tarefas finalizadas'}, {value: 'CLOSED', label: 'Tarefas fechadas'}, { value: 'CANCELED', label: 'Tarefas canceladas' }
  ];
  constructor(
    private popoverController: PopoverController,
    public ss: SignatureService
  ) { }

  ngOnInit() {
  }

  dismissPopover() {
    this.popoverController.dismiss();
  }

  onStatusFocus(status: string) {
    setTimeout(() => {
      if (status !== this.ss.selectedStatus) {
        this.ss.selectedStatus = status;
        this.filterStatus();
      }
    }, 600);
  }

  filterStatus() {
    this.ss.list(this.ss.selectedStatus).subscribe({});
  }
}
