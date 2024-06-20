package ecole.suptech.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ecole.suptech.entities.Produit;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    List<Produit> findByFournisseurId(Long fournisseurId);
}
 