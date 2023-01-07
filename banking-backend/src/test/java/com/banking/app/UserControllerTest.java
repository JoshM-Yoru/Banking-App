package com.banking.app;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

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

import com.banking.app.models.User;
import com.banking.app.repositories.UserRepository;
import com.banking.app.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = AppApplication.class)
@AutoConfigureTestDatabase
@AutoConfigureMockMvc
class UserControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  UserService uServ;

  @Autowired
  UserRepository uRepo;

  private ObjectMapper om = new ObjectMapper();

  @BeforeEach
  public void resetDatabase() {
    System.out.println("Run before each test");
    uRepo.deleteAll();
  }

  @Test
  @Transactional
  public void testSuccessfulRegister() throws Exception {

    LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
    map.put("firstName", "first");
    map.put("lastName", "last");
    map.put("email", "name@email.com");
    map.put("address", "123 streetname");
    map.put("phoneNumber", "34274763");
    map.put("accountType", "checking");

    String context = om.writeValueAsString(map);
    mockMvc.perform(post("/users/register")
        .contentType(MediaType.APPLICATION_JSON)
        .content(context))
        .andDo(print())
        .andReturn();

    User registered = uRepo.getByEmail("name@email.com").get();
    assertEquals("first", registered.getFirstName());
    assertEquals("last", registered.getLastName());
    assertEquals("name@email.com", registered.getEmail());
    assertEquals("123 streetname", registered.getAddress());
    assertEquals("34274763", registered.getPhoneNumber());

    System.out.println(registered.getUserId());
    System.out.println(registered.getPassword());

  }

  @Test
  @Transactional
  public void testfailedRegister() throws Exception {
    // System.out.println("Test 2: First user to register(is successful)" );
    LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
    map.put("firstName", "first");
    map.put("lastName", "last");
    map.put("email", "name@email.com");
    map.put("address", "123 streetname");
    map.put("phoneNumber", "34274763");
    map.put("accountType", "checking");
    String cxt = om.writeValueAsString(map);

    mockMvc.perform(post("/users/register")
        .contentType(MediaType.APPLICATION_JSON)
        .content(cxt))
        .andReturn();
    // .andDo(print())

    System.out.println("Test2: Second user to register(fails)");
    LinkedHashMap<String, String> map2 = new LinkedHashMap<String, String>();
    map2.put("firstName", "first2");
    map2.put("lastName", "last2");
    map2.put("email", "name@email.com");
    map2.put("address", "1234 streetname");
    map2.put("phoneNumber", "34274765");
    map2.put("accountType", "checking");
    String cxt2 = om.writeValueAsString(map2);

    assertThrows(Exception.class, () -> {
      mockMvc.perform(post("/users/register")
          .contentType(MediaType.APPLICATION_JSON)
          .content(cxt2))
          .andReturn();
    });

  }

  @Test
  @Transactional
  public void testSuccessfulLogin() throws Exception {
    LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
    map.put("firstName", "first");
    map.put("lastName", "last");
    map.put("email", "name@email.com");
    map.put("address", "123 streetname");
    map.put("phoneNumber", "34274763");
    map.put("accountType", "checking");
    String cxt = om.writeValueAsString(map);
    mockMvc.perform(post("/users/register")
        .contentType(MediaType.APPLICATION_JSON)
        .content(cxt))
        .andReturn();
    User reg = uRepo.getByEmail("name@email.com").get();
    // Loggin happens here
    LinkedHashMap<String, String> logMap = new LinkedHashMap<String, String>();
    logMap.put("email", "name@email.com");
    logMap.put("password", reg.getPassword());
    String cxt2 = om.writeValueAsString(logMap);
    MvcResult res = mockMvc.perform(post("/users/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(cxt2))
        .andReturn();

    User u = om.readValue(res.getResponse().getContentAsString(), User.class);

    assertEquals("first", u.getFirstName());
    assertEquals("last", u.getLastName());
    assertEquals("name@email.com", u.getEmail());
    assertEquals("123 streetname", u.getAddress());
    assertEquals("34274763", u.getPhoneNumber());
  }

  @Test
  @Transactional
  public void testFailedLogin() throws Exception {

    LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
    map.put("firstName", "first");
    map.put("lastName", "last");
    map.put("email", "name@email.com");
    map.put("address", "123 streetname");
    map.put("phoneNumber", "34274763");
    map.put("accountType", "checking");
    String cxt = om.writeValueAsString(map);
    mockMvc.perform(post("/users/register")
        .contentType(MediaType.APPLICATION_JSON)
        .content(cxt))
        .andReturn();
    // Loggin happens here
    LinkedHashMap<String, String> logMap = new LinkedHashMap<String, String>();
    logMap.put("email", "name@email.com");
    logMap.put("password", "notThePassword");
    String cxt2 = om.writeValueAsString(logMap);

    assertThrows(Exception.class, () -> {
      mockMvc.perform(post("/users/login")
          .contentType(MediaType.APPLICATION_JSON)
          .content(cxt2))
          .andReturn();
    });
  }

  @Test
  @Transactional
  public void testSuccessfulUpdateUser() throws Exception {

    LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
    map.put("firstName", "first");
    map.put("lastName", "last");
    map.put("email", "name@email.com");
    map.put("address", "123 streetname");
    map.put("phoneNumber", "34274763");
    map.put("accountType", "checking");
    String cxt = om.writeValueAsString(map);
    mockMvc.perform(post("/users/register")
        .contentType(MediaType.APPLICATION_JSON)
        .content(cxt))
        .andReturn();

    LinkedHashMap<String, String> upMap = new LinkedHashMap<String, String>();
    upMap.put("email", "name@email.com");
    upMap.put("firstName", "NewFirst");
    upMap.put("lastName", "NewLast");
    String cxt2 = om.writeValueAsString(upMap);
    mockMvc.perform(put("/users/update")
        .contentType(MediaType.APPLICATION_JSON)
        .content(cxt2))
        .andReturn();

    User updated = uRepo.getByEmail("name@email.com").get();
    assertNotEquals("first", updated.getFirstName());
    assertNotEquals("last", updated.getLastName());
    assertEquals("NewFirst", updated.getFirstName());
    assertEquals("NewLast", updated.getLastName());
  }

  public void testFailedUpdateUser() throws Exception {

    LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
    map.put("firstName", "first");
    map.put("lastName", "last");
    map.put("email", "name@email.com");
    map.put("address", "123 streetname");
    map.put("phoneNumber", "34274763");
    map.put("accountType", "checking");
    String cxt = om.writeValueAsString(map);
    mockMvc.perform(post("/users/register")
        .contentType(MediaType.APPLICATION_JSON)
        .content(cxt))
        .andReturn();

    LinkedHashMap<String, String> upMap = new LinkedHashMap<String, String>();
    upMap.put("email", "name@emil.com");
    upMap.put("firstName", "NewFirst");
    upMap.put("lastName", "NewLast");
    String cxt2 = om.writeValueAsString(upMap);

    assertThrows(Exception.class, () -> {
      mockMvc.perform(put("/users/update")
          .contentType(MediaType.APPLICATION_JSON)
          .content(cxt2))
          .andReturn();
    });

    User updated = uRepo.getByEmail("name@email.com").get();
    assertEquals("first", updated.getFirstName());
    assertEquals("last", updated.getLastName());
    assertNotEquals("NewFirst", updated.getFirstName());
    assertNotEquals("NewLast", updated.getLastName());
  }

  @Test
  @Transactional
  public void testSuccessfulUpdatePassword() throws Exception {
    LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
    map.put("firstName", "first");
    map.put("lastName", "last");
    map.put("email", "name@email.com");
    map.put("address", "123 streetname");
    map.put("phoneNumber", "34274763");
    map.put("accountType", "checking");
    String cxt = om.writeValueAsString(map);
    mockMvc.perform(post("/users/register")
        .contentType(MediaType.APPLICATION_JSON)
        .content(cxt))
        .andReturn();

    LinkedHashMap<String, String> upMap = new LinkedHashMap<String, String>();
    upMap.put("email", "name@email.com");
    upMap.put("password", "NewPassword");
    String cxt2 = om.writeValueAsString(upMap);
    mockMvc.perform(put("/users/update_password")
        .contentType(MediaType.APPLICATION_JSON)
        .content(cxt2))
        .andReturn();

    User updated = uRepo.getByEmail("name@email.com").get();
    assertEquals("NewPassword", updated.getPassword());
  }

  @Test
  @Transactional
  public void testFailedUpdatePassword() throws Exception {
    LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
    map.put("firstName", "first");
    map.put("lastName", "last");
    map.put("email", "name@email.com");
    map.put("address", "123 streetname");
    map.put("phoneNumber", "34274763");
    map.put("accountType", "checking");
    String cxt = om.writeValueAsString(map);
    mockMvc.perform(post("/users/register")
        .contentType(MediaType.APPLICATION_JSON)
        .content(cxt))
        .andReturn();

    LinkedHashMap<String, String> upMap = new LinkedHashMap<String, String>();
    upMap.put("email", "name@eail.com");
    upMap.put("password", "NewPassword");
    String cxt2 = om.writeValueAsString(upMap);
    assertThrows(Exception.class, () -> {
      mockMvc.perform(put("/users/update_password")
          .contentType(MediaType.APPLICATION_JSON)
          .content(cxt2))
          .andReturn();
    });

    User updated = uRepo.getByEmail("name@email.com").get();
    assertNotEquals("NewPassword", updated.getPassword());
  }

  @Test
  @Transactional
  public void testSuccessfulUserByEmail() throws Exception {
    LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
    map.put("firstName", "first");
    map.put("lastName", "last");
    map.put("email", "name@email.com");
    map.put("address", "123 streetname");
    map.put("phoneNumber", "34274763");
    map.put("accountType", "checking");
    String cxt = om.writeValueAsString(map);
    mockMvc.perform(post("/users/register")
        .contentType(MediaType.APPLICATION_JSON)
        .content(cxt))
        .andReturn();

    LinkedHashMap<String, String> gMap = new LinkedHashMap<String, String>();
    gMap.put("email", "name@email.com");
    String cxt2 = om.writeValueAsString(gMap);
    MvcResult res = mockMvc.perform(post("/users/user")
        .contentType(MediaType.APPLICATION_JSON)
        .content(cxt2))
        .andReturn();

    User u = om.readValue(res.getResponse().getContentAsString(), User.class);
    assertEquals("first", u.getFirstName());
    assertEquals("last", u.getLastName());
    assertEquals("name@email.com", u.getEmail());
  }

}
