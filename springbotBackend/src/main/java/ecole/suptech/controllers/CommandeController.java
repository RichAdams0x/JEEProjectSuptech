package ecole.suptech.controllers;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ecole.suptech.entities.Client;
import ecole.suptech.entities.Commande;
import ecole.suptech.entities.LigneCommande;
import ecole.suptech.services.ClientService;
import ecole.suptech.services.CommandeService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("commandes")
public class CommandeController {
    @Autowired
    private CommandeService commandeService;
    @Autowired
    private ClientService clientService;

    @PostMapping("/{clientId}")
    public Commande ajouterCommande(@PathVariable Long clientId,@RequestBody Commande commande) {
        Optional<Client> client = clientService.findById(clientId);
        if (client.isPresent()) {
            commande.setClient(client.get());
            return commandeService.save(commande);
        }else{
            throw new Error("Le client n'existe pas");
        }
    }

    @GetMapping
    public List<Commande> obtenirToutesLesCommandes() {
        return commandeService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Commande> obtenirCommandeParId(@PathVariable Long id) {
        return commandeService.findById(id);
    }

    @GetMapping("/client/{clientId}")
    public List<Commande> obtenirCommandesParClient(@PathVariable Long clientId) {
        return commandeService.findByClientId(clientId);
    }

    @DeleteMapping("/{id}")
    public void supprimerCommandeParId(@PathVariable Long id) {
        Commande commande = commandeService.findById(id)
            .orElseThrow();

    // Iterate over the lignesCommande and set a default value for quantite if it's null
    for (LigneCommande ligneCommande : commande.getLignes()) {
        if (ligneCommande.getQuantite() == null) {
            ligneCommande.setQuantite(0); // Or set any appropriate default value
        }
    }
    commandeService.delete(commande);
    }

    @DeleteMapping
    public void supprimerCommande(@RequestBody Commande commande) {
        
        commandeService.delete(commande);
    }

    @PutMapping("/{id}")
    public Commande mettreAJourCommande(@PathVariable Long id, @RequestBody Commande commande) {
        Optional<Commande> commandeAMettreAJour = commandeService.findById(id);
        if(commandeAMettreAJour.isPresent()) {
            Commande c = commandeAMettreAJour.get();
            c.setClient(commande.getClient());
            c.setLignes(commande.getLignes());
            c.setDateCMD(commande.getDateCMD());
            return commandeService.save(c);
        }
        return null;
    }
}
