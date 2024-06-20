package ecole.suptech.controllers;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ecole.suptech.entities.Commande;
import ecole.suptech.entities.Fournisseur;
import ecole.suptech.entities.LigneCommande;
import ecole.suptech.entities.PostLigneCommande;
import ecole.suptech.entities.Produit;
import ecole.suptech.services.CommandeService;
import ecole.suptech.services.LigneCommandeService;
import ecole.suptech.services.ProduitService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("ligne-commandes")
public class LigneCommandeController {
    @Autowired
    private LigneCommandeService ligneCommandeService;
    @Autowired
    private CommandeService commandeService;@Autowired
    private ProduitService produitService;

    @PostMapping
    public LigneCommande ajouterLigneCommande(@RequestBody PostLigneCommande postLigneCommande) {
        System.out.println(postLigneCommande);
        Optional<Commande> commande = commandeService.findById(postLigneCommande.getCommande().getId());
        Optional<Produit> produit = produitService.findById(postLigneCommande.getProduit().getId());
        if (produit.isPresent()&&commande.isPresent()) {
            LigneCommande ligneCommande = new LigneCommande();
        // Set the Commande and Produit properties
        ligneCommande.setCommande(commande.get());
        ligneCommande.setProduit(produit.get());
        ligneCommande.setQuantite(postLigneCommande.getQuantite());
        // Save the LigneCommande object
            return ligneCommandeService.save(ligneCommande);
        }else{
            throw new Error("Le produit ou la commande n'existe pas");
        }
    }

    @GetMapping
    public List<LigneCommande> obtenirToutesLesLignesCommande() {
        return ligneCommandeService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<LigneCommande> obtenirLigneCommandeParId(@PathVariable Long id) {
        return ligneCommandeService.findById(id);
    }

    @GetMapping("/commande/{commandeId}")
    public List<LigneCommande> obtenirLignesCommandeParCommande(@PathVariable Long commandeId) {
        return ligneCommandeService.findByCommandeId(commandeId);
    }

    @DeleteMapping("/{id}")
    public void supprimerLigneCommandeParId(@PathVariable Long id) {
        ligneCommandeService.deleteById(id);
    }

    @DeleteMapping
    public void supprimerLigneCommande(@RequestBody LigneCommande ligneCommande) {
        ligneCommandeService.delete(ligneCommande);
    }

    @PutMapping("/{id}")
    public LigneCommande mettreAJourLigneCommande(@PathVariable Long id, @RequestBody LigneCommande ligneCommande) {
        Optional<LigneCommande> ligneCommandeAMettreAJour = ligneCommandeService.findById(id);
        if(ligneCommandeAMettreAJour.isPresent()) {
            LigneCommande lc = ligneCommandeAMettreAJour.get();
            lc.setProduit(ligneCommande.getProduit());
            lc.setQuantite(ligneCommande.getQuantite());
            return ligneCommandeService.save(lc);
        }
        return null;
    }
}
