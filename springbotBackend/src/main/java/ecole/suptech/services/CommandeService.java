package ecole.suptech.services;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecole.suptech.entities.Commande;
import ecole.suptech.repositories.CommandeRepository;

@Service
public class CommandeService {
    @Autowired
    private CommandeRepository commandeRepository;

    public Commande save(Commande commande) {
        return commandeRepository.save(commande);
    }

    public List<Commande> findAll() {
        return commandeRepository.findAll();
    }

    public Optional<Commande> findById(Long id) {
        return commandeRepository.findById(id);
    }

    public List<Commande> findByClientId(Long clientId) {
        return commandeRepository.findByClientId(clientId);
    }

    public void deleteById(Long id) {
        commandeRepository.deleteById(id);
    }

    public void delete(Commande commande) {
        commandeRepository.delete(commande);
    }
}