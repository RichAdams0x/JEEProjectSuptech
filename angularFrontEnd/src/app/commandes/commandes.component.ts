import { Component, OnInit, ViewChild } from '@angular/core';
import { CommandeService } from '../commande.service';
import { ClientService } from '../client.service';
import { ProduitService } from '../produit.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { getOrderTime } from '../../utils/getOrderTime';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css'],
  standalone: true,
  imports: [HttpClientModule, NgFor, ReactiveFormsModule, NgbModule],
})
export class CommandesComponent implements OnInit {
  commandes: any[] = [];
  lignesCommande: any[] = [];
  clients: any[] = [];
  produits: any[] = [];
  commandeForm: FormGroup;
  ligneCommandeForm: FormGroup;
  currentCommande: any | null = null;
  commandeToDelete: number | null = null;
  @ViewChild('successDeleteModal') successDeleteModal: any;
  constructor(
    private commandeService: CommandeService,
    private clientService: ClientService,
    private produitService: ProduitService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.commandeForm = this.fb.group({
      client: [''],
    });

    this.ligneCommandeForm = this.fb.group({
      produit: [''],
      quantite: [''],
    });
  }

  ngOnInit(): void {
    this.loadCommandes();
    this.loadClients();
    this.loadProduits();
  }
  getTime(ts: any): any {
    return getOrderTime(ts);
  }

  loadCommandes(): void {
    this.commandeService.getCommandes().subscribe((data) => {
      this.commandes = data;
    });
  }

  loadClients(): void {
    this.clientService.getClients().subscribe((data) => {
      this.clients = data;
    });
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe((data) => {
      this.produits = data;
    });
  }

  openModal(content: any): void {
    this.modalService.open(content);
  }

  openAddLigneCommandeModal(commande: any, content: any): void {
    this.currentCommande = commande;
    this.modalService.open(content);
  }

  openViewLignesCommandeModal(commande: any, modal: any) {
    this.lignesCommande = commande.lignes;
    this.modalService.open(modal);
  }

  addCommande(): void {
    const newCommande = { client: { id: this.commandeForm.value.client } };
    this.commandeService.addCommande(newCommande).subscribe(() => {
      this.loadCommandes();
      this.modalService.dismissAll();
    });
  }

  addLigneCommande(): void {
    if (this.currentCommande !== null) {
      const newLigneCommande = {
        produit: { id: this.ligneCommandeForm.value.produit },
        quantite: this.ligneCommandeForm.value.quantite,
        commande: this.currentCommande,
      };
      this.commandeService.addLigneCommande(newLigneCommande).subscribe(() => {
        this.loadCommandes();
        this.modalService.dismissAll();
      });
    }
  }

  openConfirmDeleteModal(id: number, content: any): void {
    this.commandeToDelete = id;
    this.modalService.open(content);
  }

  confirmDelete(): void {
    if (this.commandeToDelete !== null) {
      this.commandeService
        .deleteCommande(this.commandeToDelete)
        .subscribe(() => {
          this.loadCommandes();
          this.modalService.dismissAll();
          this.openModal(this.successDeleteModal);
        });
    }
  }
}
