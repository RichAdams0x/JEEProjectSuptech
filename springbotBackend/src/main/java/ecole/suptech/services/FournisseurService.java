package ecole.suptech.services;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecole.suptech.entities.Fournisseur;
import ecole.suptech.repositories.FournisseurRepository;

@Service
public class FournisseurService {
    @Autowired
    private FournisseurRepository fournisseurRepository;

    public Fournisseur save(Fournisseur fournisseur) {
        return fournisseurRepository.save(fournisseur);
    }

    public List<Fournisseur> findAll() {
        return fournisseurRepository.findAll();
    }

    public Optional<Fournisseur> findById(Long id) {
        return fournisseurRepository.findById(id);
    }

    public void deleteById(Long id) {
        fournisseurRepository.deleteById(id);
    }

    public void delete(Fournisseur fournisseur) {
        fournisseurRepository.delete(fournisseur);
    }
}