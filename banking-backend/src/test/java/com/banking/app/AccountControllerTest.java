package com.banking.app;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import java.util.LinkedHashMap;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import com.banking.app.models.Account;
import com.banking.app.models.AccountType;
import com.banking.app.models.User;
import com.banking.app.repositories.AccountRepository;
import com.banking.app.repositories.UserRepository;
import com.banking.app.services.AccountService;
import com.banking.app.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = AppApplication.class)
@AutoConfigureTestDatabase
@AutoConfigureMockMvc
class AccountControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  AccountService aServ;

  @Autowired
  AccountRepository aRepo;

  @Autowired
  UserService uServ;

  @Autowired
  UserRepository uRepo;

  private ObjectMapper om = new ObjectMapper();

  @BeforeEach
  public void resetDatabase() {
    System.out.println("Run before each test");
    uRepo.deleteAll();
    aRepo.deleteAll();
  }

  @Test
  @Transactional
  public void testCreateAccount() throws Exception {
    LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
    map.put("firstName", "first");
    map.put("lastName", "last");
    map.put("email", "name@email.com");
    map.put("address", "123 streetname");
    map.put("phoneNumber", "34274763");
    map.put("accountType", "checking");

    String cxt = om.writeValueAsString(map);
    MvcResult res = mockMvc.perform(post("/users/register")
        .contentType(MediaType.APPLICATION_JSON)
        .content(cxt))
        .andReturn();

    User u = om.readValue(res.getResponse().getContentAsString(), User.class);
    Account a = new Account("Savings", u, 500.00);
    String cxt2 = om.writeValueAsString(a);
    MvcResult res2 = mockMvc.perform(post("/accounts/create")
        .contentType(MediaType.APPLICATION_JSON)
        .content(cxt2))
        .andReturn();
    // .andDo(print())

    Account a2 = om.readValue(res2.getResponse().getContentAsString(), Account.class);
    assertEquals(500.00, a2.getBalance());
    // assertEquals(AccountType.SAVINGS, a2.getType());
    // assertEquals(u.getUserId(), a2.getUser().getUserId());
  }

  /*
   * @Test
   * 
   * @Transactional public void testtransferFunds() throws Exception {
   * LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
   * map.put("firstName", "first"); map.put("lastName", "last"); map.put("email",
   * "name@email.com"); map.put("address", "123 streetname");
   * map.put("phoneNumber", "34274763"); map.put("accountType", "checking");
   * 
   * String uCxt = om.writeValueAsString(map); MvcResult res
   * =mockMvc.perform(post("/users/register")
   * .contentType(MediaType.APPLICATION_JSON) .content(uCxt)) .andReturn();
   * 
   * User u = om.readValue(res.getResponse().getContentAsString(), User.class);
   * Account a = new Account("Savings", u, 500.00); Account a2 = new
   * Account("Checking", u, 200.00); String acc1cxt = om.writeValueAsString(a);
   * String acc2cxt = om.writeValueAsString(a2); MvcResult acc1res =
   * mockMvc.perform(post("/accounts/create")
   * .contentType(MediaType.APPLICATION_JSON) .content(acc1cxt)) .andReturn();
   * MvcResult acc2res = mockMvc.perform(post("/accounts/create")
   * .contentType(MediaType.APPLICATION_JSON) .content(acc2cxt)) .andReturn();
   * Account acc1 = om.readValue(acc1res.getResponse().getContentAsString(),
   * Account.class); Account acc2 =
   * om.readValue(acc2res.getResponse().getContentAsString(), Account.class);
   * 
   * LinkedHashMap<String, Object> map2 = new LinkedHashMap<String, Object>();
   * map2.put("accountIdFrom", acc1.getAccountId()); map2.put("accountIdTo",
   * acc2.getAccountId()); map2.put("amount", 300.00); String transCxt =
   * om.writeValueAsString(map2); mockMvc.perform(post("/accounts/transfer")
   * .contentType(MediaType.APPLICATION_JSON) .content(transCxt)) .andReturn();
   * 
   * assertEquals(200.00, acc1.getBalance()); assertEquals(500.00,
   * acc2.getBalance());
   * 
   * }
   */

}
