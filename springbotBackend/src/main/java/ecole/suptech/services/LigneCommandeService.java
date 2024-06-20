package ecole.suptech.services;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecole.suptech.entities.LigneCommande;
import ecole.suptech.repositories.LigneCommandeRepository;

@Service
public class LigneCommandeService {
    @Autowired
    private LigneCommandeRepository ligneCommandeRepository;

    public LigneCommande save(LigneCommande  ligneCommande) {
        return ligneCommandeRepository.save(ligneCommande);
    }

    public List<LigneCommande> findAll() {
        return ligneCommandeRepository.findAll();
    }

    public Optional<LigneCommande> findById(Long id) {
        return ligneCommandeRepository.findById(id);
    }

    public List<LigneCommande> findByCommandeId(Long commandeId) {
        return ligneCommandeRepository.findByCommandeId(commandeId);
    }

    public void deleteById(Long id) {
        ligneCommandeRepository.deleteById(id);
    }

    public void delete(LigneCommande ligneCommande) {
        ligneCommandeRepository.delete(ligneCommande);
    }
}