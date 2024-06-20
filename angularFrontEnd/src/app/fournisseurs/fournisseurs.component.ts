import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FournisseurService } from '../fournisseur.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.css'],
  standalone: true,
  imports: [HttpClientModule, NgFor, ReactiveFormsModule, NgbModule],
})
export class FournisseursComponent implements OnInit {
  fournisseurs: any[] = [];
  fournisseurForm: FormGroup;
  fournisseurEditForm: FormGroup;
  private deleteId: number | null = null;
  private confirmModalRef: NgbModalRef | null = null;

  private fournisseurService = inject(FournisseurService);
  @ViewChild('successModal') successModal: any;
  @ViewChild('confirmModal') confirmModal: any;

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.fournisseurForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
    });
    this.fournisseurEditForm = this.fb.group({
      id: [''],
      nom: [''],
      prenom: [''],
      email: [''],
    });
  }

  ngOnInit(): void {
    this.loadFournisseurs();
  }

  loadFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe((data) => {
      this.fournisseurs = data;
    });
  }

  openModal(content: any): void {
    this.modalService.open(content);
  }

  addFournisseur(): void {
    const newFournisseur = this.fournisseurForm.value;
    this.fournisseurService.addFournisseur(newFournisseur).subscribe(() => {
      this.loadFournisseurs();
      this.modalService.dismissAll();
    });
  }

  openEditModal(fournisseur: any, content: any): void {
    this.fournisseurEditForm.patchValue({
      id: fournisseur.id,
      nom: fournisseur.nom,
      prenom: fournisseur.prenom,
      email: fournisseur.email,
    });
    this.modalService.open(content);
  }

  updateFournisseur(): void {
    const updatedFournisseur = this.fournisseurEditForm.value;
    this.fournisseurService
      .updateFournisseur(updatedFournisseur.id, updatedFournisseur)
      .subscribe(() => {
        this.loadFournisseurs();
        this.modalService.dismissAll();
      });
  }

  openConfirmModal(id: number, content: any): void {
    this.deleteId = id;
    this.confirmModalRef = this.modalService.open(content);
  }

  confirmDelete(): void {
    if (this.deleteId !== null) {
      this.fournisseurService.deleteFournisseur(this.deleteId).subscribe(() => {
        this.loadFournisseurs();
        this.confirmModalRef?.close();
        this.openModal(this.successModal);
      });
    }
  }

  deleteFournisseur(id: number): void {
    this.openConfirmModal(id, this.confirmModal);
  }
}
