import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../client.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  imports: [
    HttpClientModule,
    NgFor,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
  ],
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  searchTerm: string = '';
  clientForm: FormGroup;
  clientEditForm: FormGroup;
  clientIdToDelete: number | null = null;
  @ViewChild('successModal') successModal: any;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.clientForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
    });

    this.clientEditForm = this.fb.group({
      id: [''],
      nom: [''],
      prenom: [''],
      email: [''],
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe((data) => {
      console.log(data);
      this.clients = data;
    });
  }

  searchClients(): void {
    if (this.searchTerm && this.searchTerm !== '') {
      this.clientService.getClients().subscribe((data) => {
        this.clients = data.filter((client: any) =>
          client.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    } else {
      this.loadClients();
    }
  }

  openModal(content: any): void {
    this.modalService.open(content);
  }

  openEditModal(client: any, content: any): void {
    this.clientEditForm.patchValue({
      id: client.id,
      nom: client.nom,
      prenom: client.prenom,
      email: client.email,
    });
    this.modalService.open(content);
  }

  addClient(): void {
    const newClient = this.clientForm.value;
    this.clientService.addClient(newClient).subscribe(() => {
      this.loadClients();
      this.modalService.dismissAll();
    });
  }

  updateClient(): void {
    const updatedClient = this.clientEditForm.value;
    this.clientService
      .updateClient(updatedClient.id, updatedClient)
      .subscribe(() => {
        this.loadClients();
        this.modalService.dismissAll();
      });
  }

  openConfirmDeleteModal(clientId: number, content: any): void {
    this.clientIdToDelete = clientId;
    this.modalService.open(content);
  }

  confirmDelete(): void {
    if (this.clientIdToDelete !== null) {
      this.clientService.deleteClient(this.clientIdToDelete).subscribe(() => {
        this.loadClients();
        this.modalService.dismissAll();
        this.openModal(this.successModal);
      });
    }
  }

  deleteClient(clientId: number, confirmModal: any): void {
    this.openConfirmDeleteModal(clientId, confirmModal);
  }
}
