package ecole.suptech.controllers;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ecole.suptech.entities.Fournisseur;
import ecole.suptech.services.FournisseurService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("fournisseurs")
public class FournisseurController {
    @Autowired
    private FournisseurService fournisseurService;

    @PostMapping
    public Fournisseur ajouterFournisseur(@RequestBody Fournisseur fournisseur) {
        return fournisseurService.save(fournisseur);
    }

    @GetMapping
    public List<Fournisseur> obtenirTousLesFournisseurs() {
        return fournisseurService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Fournisseur> obtenirFournisseurParId(@PathVariable Long id) {
        return fournisseurService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void supprimerFournisseurParId(@PathVariable Long id) {
        fournisseurService.deleteById(id);
    }

    @DeleteMapping
    public void supprimerFournisseur(@RequestBody Fournisseur fournisseur) {
        fournisseurService.delete(fournisseur);
    }

    @PutMapping("/{id}")
    public Fournisseur mettreAJourFournisseur(@PathVariable Long id, @RequestBody Fournisseur fournisseur) {
        Optional<Fournisseur> fournisseurAMettreAJour = fournisseurService.findById(id);
        if(fournisseurAMettreAJour.isPresent()) {
            Fournisseur f = fournisseurAMettreAJour.get();
            f.setNom(fournisseur.getNom());
            f.setPrenom(fournisseur.getPrenom());
            f.setEmail(fournisseur.getEmail());
            return fournisseurService.save(f);
        }
        return null;
    }
}
