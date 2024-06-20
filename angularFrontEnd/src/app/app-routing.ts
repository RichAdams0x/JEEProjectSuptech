import { Routes } from '@angular/router';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component';
import { ProduitsComponent } from './produits/produits.component';
import { CommandesComponent } from './commandes/commandes.component';
import { ClientsComponent } from './clients/clients.component';

export const routes: Routes = [
  { path: 'fournisseurs', component: FournisseursComponent },
  { path: 'produits', component: ProduitsComponent },
  { path: 'commandes', component: CommandesComponent },
  { path: 'clients', component: ClientsComponent },
  { path: '', redirectTo: '/fournisseurs', pathMatch: 'full' }, // Redirection par défaut
  { path: '**', redirectTo: '/fournisseurs', pathMatch: 'full' }, // Redirection pour les routes non trouvées
];
