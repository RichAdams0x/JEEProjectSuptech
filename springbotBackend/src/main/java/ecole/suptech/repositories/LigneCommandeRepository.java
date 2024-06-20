package ecole.suptech.repositories;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ecole.suptech.entities.LigneCommande;

@Repository
public interface LigneCommandeRepository extends JpaRepository<LigneCommande, Long> {
    List<LigneCommande> findByCommandeId(Long commandeId);
}
