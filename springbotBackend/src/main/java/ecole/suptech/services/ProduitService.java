package ecole.suptech.services;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ecole.suptech.entities.Produit;
import ecole.suptech.repositories.ProduitRepository;
@Service
public class ProduitService {
    @Autowired
    private ProduitRepository produitRepository;

    public Produit save(Produit produit) {
        return produitRepository.save(produit);
    }

    public List<Produit> findAll() {
        return produitRepository.findAll();
    }

    public Optional<Produit> findById(Long id) {
        return produitRepository.findById(id);
    }

    public List<Produit> findByFournisseurId(Long fournisseurId) {
        return produitRepository.findByFournisseurId(fournisseurId);
    }

    public void deleteById(Long id) {
        produitRepository.deleteById(id);
    }

    public void delete(Produit produit) {
        produitRepository.delete(produit);
    }
}