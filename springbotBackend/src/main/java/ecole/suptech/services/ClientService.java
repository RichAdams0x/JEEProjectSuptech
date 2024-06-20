package ecole.suptech.services;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecole.suptech.entities.Client;
import ecole.suptech.repositories.ClientRepository;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public Client save(Client client) {
        return clientRepository.save(client);
    }

    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    public Optional<Client> findById(Long id) {
        return clientRepository.findById(id);
    }

    public void deleteById(Long id) {
        clientRepository.deleteById(id);
    }

    public void delete(Client client) {
        clientRepository.delete(client);
    }

public List<Client> findByNom(String nom) {
    return clientRepository.findByNomContainingIgnoreCase(nom);
}

}
