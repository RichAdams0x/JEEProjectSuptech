import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ProduitService } from '../produit.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
  standalone: true,
  imports: [HttpClientModule, NgFor, ReactiveFormsModule, NgbModule],
})
export class ProduitsComponent implements OnInit {
  produits: any[] = [];
  fournisseurs: any[] = []; // Define fournisseurs property
  produitIdToDelete: number | null = null;
  produitForm: FormGroup;
  produitEditForm: FormGroup;
  @ViewChild('deleteSuccessModal') deleteSuccessModal: any;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private produitService: ProduitService,
    private fournisseurService: FournisseurService
  ) {
    this.produitForm = this.fb.group({
      nom: [''],
      quantite: [''],
      prix: [''],
      fournisseurId: [''], // Add fournisseurId to product form
    });

    this.produitEditForm = this.fb.group({
      id: [''],
      nom: [''],
      prix: [''],
      quantite: [''],
      fournisseurId: [''], // Add fournisseurId to product edit form
    });
  }

  ngOnInit(): void {
    this.loadProduits();
    this.loadFournisseurs(); // Load fournisseurs when component initializes
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe((data) => {
      this.produits = data;
    });
  }

  loadFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe((data) => {
      this.fournisseurs = data;
    });
  }

  openModal(content: any): void {
    this.modalService.open(content);
  }

  openEditModal(produit: any, content: any): void {
    this.produitEditForm.patchValue({
      id: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      quantite: produit.quantite,
      fournisseur: produit.fournisseur, // Populate fournisseurId in edit form
    });
    this.modalService.open(content);
  }

  addProduit(): void {
    const newProduit = this.produitForm.value;
    this.produitService.addProduit(newProduit).subscribe(() => {
      this.loadProduits();
      this.modalService.dismissAll();
    });
  }

  updateProduit(): void {
    const updatedProduit = this.produitEditForm.value;
    console.log(updatedProduit);

    this.produitService
      .updateProduit(updatedProduit.id, updatedProduit)
      .subscribe(() => {
        this.loadProduits();
        this.modalService.dismissAll();
      });
  }
  openDeleteConfirmationModal(produitId: number, modal: any) {
    this.produitIdToDelete = produitId;
    this.modalService.open(modal);
  }

  confirmDeleteProduit(): void {
    if (this.produitIdToDelete !== null) {
      this.deleteProduit(this.produitIdToDelete);
      this.produitIdToDelete = null;
      this.modalService.dismissAll(); // Close the modal
    }
  }

  deleteProduit(id: number): void {
    this.produitService.deleteProduit(id).subscribe(() => {
      this.loadProduits();
      this.modalService.open(this.deleteSuccessModal); // Open the success modal
    });
  }
}
