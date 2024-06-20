package ecole.suptech.controllers;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ecole.suptech.entities.Fournisseur;
import ecole.suptech.entities.Produit;
import ecole.suptech.services.FournisseurService;
import ecole.suptech.services.ProduitService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("produits")
public class ProduitController {
    @Autowired
    private ProduitService produitService;
    @Autowired
    private FournisseurService fournisseurService;

    @PostMapping("/{fournisseurId}")
    public Produit ajouterProduit(@PathVariable Long fournisseurId,@RequestBody Produit produit) {
        Optional<Fournisseur> fournisseur = fournisseurService.findById(fournisseurId);
        if (fournisseur.isPresent()) {
            produit.setFournisseur(fournisseur.get());
            return produitService.save(produit);
        }else{
            throw new Error("Le fournisseur n'existe pas");
        }
    }

    @GetMapping
    public List<Produit> obtenirTousLesProduits() {
        return produitService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Produit> obtenirProduitParId(@PathVariable Long id) {
        return produitService.findById(id);
    }

    @GetMapping("/fournisseur/{fournisseurId}")
    public List<Produit> obtenirProduitsParFournisseur(@PathVariable Long fournisseurId) {
        return produitService.findByFournisseurId(fournisseurId);
    }

    @DeleteMapping("/{id}")
    public void supprimerProduitParId(@PathVariable Long id) {
        produitService.deleteById(id);
    }

    @DeleteMapping
    public void supprimerProduit(@RequestBody Produit produit) {
        produitService.delete(produit);
    }

    @PutMapping("/{id}")
    public Produit mettreAJourProduit(@PathVariable Long id, @RequestBody Produit produit) {
        Optional<Produit> produitAMettreAJour = produitService.findById(id);
        if(produitAMettreAJour.isPresent()) {
            Produit p = produitAMettreAJour.get();
            p.setNom(produit.getNom());
            p.setPrix(produit.getPrix());
            return produitService.save(p);
        }
        return null;
    }
}