package com.banking.app.models;

import java.util.List;
import java.util.UUID;

import com.banking.app.utils.RandomPasswordGenerator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "user_id")
  private UUID userId;

  @Enumerated(EnumType.STRING)
  private UserType type;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(unique = true)
  private String email;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private String password;

  private String address;
  private String phoneNumber;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  @JsonIgnore
  private List<Account> accounts;

  @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
  @JoinColumn(name = "credit_card")
  @JsonIgnore
  private CreditCard creditCard;

  @Column(name = "auth_token")
  private Integer authToken;

  @Column(name = "first_login")
  private Boolean firstLogin;

  // Register Constructor
  // Basic Register constructor
  public User(String firstName, String lastName, String email, String address, String phoneNumber) {
    this.type = UserType.MEMBER;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.password = RandomPasswordGenerator.generatePassword();
    this.firstLogin = true;
  }
}
