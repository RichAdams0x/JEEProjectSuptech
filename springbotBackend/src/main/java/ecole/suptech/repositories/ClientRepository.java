package ecole.suptech.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ecole.suptech.entities.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    List<Client> findByNomContainingIgnoreCase(String nom);
}