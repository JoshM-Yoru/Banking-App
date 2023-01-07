package com.banking.app.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.banking.app.exceptions.CannotUpdateUserException;
import com.banking.app.models.User;
import com.banking.app.services.UserService;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import jakarta.transaction.Transactional;

@Configuration
@Transactional
public class MessageSender {
  // Find your Account SID and Auth Token at twilio.com/console
  // and set the environment variables. See http://twil.io/secure
  private static final String ACCOUNT_SID = System.getenv("TWILIOSID");
  private static final String AUTH_TOKEN = System.getenv("TWILIOAUTHTOKEN");
  @Autowired
  // private static UserRepository uRepo;
  private UserService uServ;

  public void SendMessage(User u) {
    Integer randLogId = (int) ((Math.random() * (999999 - 111111)) + 111111);
    if (u.getAuthToken() == null) {
      u.setAuthToken(randLogId);
      try {
        System.out.println(u.getFirstName() + u.getLastName() + u.getAuthToken() + "****************88");
        @SuppressWarnings("unused")
        User updatedUser = uServ.updateUser(u);
      } catch (Exception e) {
        throw new CannotUpdateUserException();
      }

      Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
      Message message = Message.creator(
          new com.twilio.type.PhoneNumber("+1" + u.getPhoneNumber()),
          new com.twilio.type.PhoneNumber(System.getenv("TWILIONUMBER")),
          "Verification Number: " + randLogId)
          .create();

      System.out.println(message.getSid());
    }
  }

  public void SendFirstPassword(User u) {
    String firstPass = u.getPassword();
    Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    Message message = Message.creator(
        new com.twilio.type.PhoneNumber("+1" + u.getPhoneNumber()),
        new com.twilio.type.PhoneNumber(System.getenv("TWILIONUMBER")),
        "This is a tempory password, please reset after login: " + firstPass)
        .create();
    System.out.println(message.getSid());
  }

}
