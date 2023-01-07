package com.banking.app.services;

import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.banking.app.exceptions.CannotUpdateUserException;
import com.banking.app.exceptions.EmailAlreadyExistsException;
import com.banking.app.exceptions.InvalidCredentialsException;
import com.banking.app.models.User;
import com.banking.app.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserService {
  private UserRepository uRepo;

  public User registerUser(User u) {
    try {
      User ret = uRepo.save(u);
      return ret;
    } catch (Exception ex) {
      throw new EmailAlreadyExistsException();
    }
  }

  public User loginUser(String email, String password) {
    User u = uRepo.getByEmail(email).orElseThrow(InvalidCredentialsException::new);

    if (!u.getPassword().equals(password)) {
      throw new InvalidCredentialsException();
    }

    return u;
  }

  public User authenticateUser(String email, Integer authToken) {
    User u = uRepo.getByEmail(email).orElseThrow(InvalidCredentialsException::new);

    if (!u.getAuthToken().equals(authToken)) {
      throw new InvalidCredentialsException();
    }

    return u;
  }

  public void logout(String email) {
    User u = uRepo.getByEmail(email).orElseThrow(InvalidCredentialsException::new);
    u.setAuthToken(null);
    
    try {
      uRepo.save(u);
    } catch (Exception ex) {
      throw new CannotUpdateUserException();
    }
  }

  public User updateUser(User u) {
	try {
	  return uRepo.save(u);
    } catch (Exception ex) {
      throw new CannotUpdateUserException();
    }
  }

  public User getUserByEmail(String email) {
    User u = null;

    try {
      return uRepo.getByEmail(email).get();
    } catch (NoSuchElementException e) {
      return u;
    }
  }
  
  public User getUserByUserId(UUID userId) {
    User u = null;

    try {
      return uRepo.findByUserId(userId);
    } catch (NoSuchElementException e) {
      return u;
    }
  }
}
