package ecole.suptech.controllers;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ecole.suptech.entities.Client;
import ecole.suptech.services.ClientService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("clients")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @PostMapping
    public Client ajouterClient(@RequestBody Client client) {
        return clientService.save(client);
    }

    @GetMapping
    public List<Client> obtenirTousLesClients() {
        return clientService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Client> obtenirClientParId(@PathVariable Long id) {
        return clientService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void supprimerClientParId(@PathVariable Long id) {
        clientService.deleteById(id);
    }

    @DeleteMapping
    public void supprimerClient(@RequestBody Client client) {
        clientService.delete(client);
    }

    @PutMapping("/{id}")
    public Client mettreAJourClient(@PathVariable Long id, @RequestBody Client client) {
        Optional<Client> clientAMettreAJour = clientService.findById(id);
        if(clientAMettreAJour.isPresent()) {
            Client c = clientAMettreAJour.get();
            c.setNom(client.getNom());
            c.setEmail(client.getEmail());
            return clientService.save(c);
        }
        return null;
    }
    @GetMapping("/search")
    public List<Client> rechercherClientParNom(@RequestParam String nom) {
        return clientService.findByNom(nom);
    }

}
