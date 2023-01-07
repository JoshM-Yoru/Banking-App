package com.banking.app.controllers;

import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banking.app.models.Account;
import com.banking.app.models.User;
import com.banking.app.services.AccountService;
import com.banking.app.services.UserService;
import com.banking.app.utils.MessageSender;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("users")
@CrossOrigin("*")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

  private UserService uServ;
  private AccountService aServ;
  private MessageSender mSend;

  @PostMapping("/register")
  public User register(@RequestBody LinkedHashMap<String, String> body) {
    String firstName = body.get("firstName");
    String lastName = body.get("lastName");
    String email = body.get("email");
    String address = body.get("address");
    String phoneNumber = body.get("phoneNumber");
    String accountType = body.get("accountType").toLowerCase();
    Double balance = 0.0;

    User u = new User(firstName, lastName, email, address, phoneNumber);
    uServ.registerUser(u);
    User registeredUser = uServ.getUserByEmail(email);
    mSend.SendFirstPassword(registeredUser);

    if (accountType.equals("both")) {
      Account checking = new Account("checking", registeredUser, balance);
      Account savings = new Account("savings", registeredUser, balance);
      aServ.createAccount(checking);
      aServ.createAccount(savings);
    } else {
      Account account = new Account(accountType, registeredUser, balance);
      aServ.createAccount(account);
    }

    return registeredUser;
  }

  @PostMapping("/login")
  public User login(@RequestBody LinkedHashMap<String, String> body) {
    String email = body.get("email");
    String password = body.get("password");
    User u = uServ.loginUser(email, password);

    mSend.SendMessage(u); 
    
    return u;
  }
  
  @PutMapping("/reset-password")
  public User resetPassword(@RequestBody LinkedHashMap<String, String> body) {
	  String email = body.get("email");
	  String password = body.get("password");
	  
	  User u = uServ.getUserByEmail(email);
	  u.setPassword(password);
	  u.setFirstLogin(false);
	  
	  return uServ.updateUser(u);
  }

  @PostMapping("/authenticate")
  public User authenticateUser(@RequestBody LinkedHashMap<String, String> body) {
    String email = body.get("email");
    Integer token = Integer.parseInt(body.get("token"));

    return uServ.authenticateUser(email, token);
  }

  @PutMapping("/logout")
  public ResponseEntity<String> logout(@RequestBody LinkedHashMap<String, String> body) {
    String email = body.get("email");
    uServ.logout(email);
    return new ResponseEntity<>("Logged out Successfully", HttpStatus.OK);
  }

  @PostMapping("/user")
  public User getUserByEmail(@RequestBody LinkedHashMap<String, String> body) {
    String email = body.get("email");

    return uServ.getUserByEmail(email);
  }

}
