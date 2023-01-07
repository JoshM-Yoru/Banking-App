package com.banking.app;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

/*
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes= AppApplication.class)
@AutoConfigureMockMvc
@AutoConfigureTestDatabase
*/
@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
public class UserServiceTest {
  // @Mock
  // UserRepository uRepo;
  //
  // @InjectMocks
  // UserService uServ;
  //
  // //We want to be sure our database is clear after each test, so lets setup a
  // @BeforeEach method to clear the database
  // @BeforeEach
  // public void resetDatabase() {
  // //System.out.println("Run before each test");
  // uRepo.deleteAll();
  // }
  //
  // @Test
  // public void testSuccessfulRegistration() throws Exception {
  // //List<User> roles = new ArrayList<>();
  // User emp = new User("First", "Last", "test@email.com", "1234 Test Rd.",
  // "555-555-5555");
  // //Optional<User> empty = Optional.empty();
  // //roles.add(emp);
  // uServ.registerUser(emp);
  // assertNotNull(uServ.getUserByEmail(emp.getEmail()));
  // assertEquals(uServ.getUserByEmail(emp.getEmail()),emp);
  // }
  //
  // @Test
  // public void testUnsuccessfulRegistration() throws Exception {
  // //List<User> roles = new ArrayList<>();
  // User emp = new User("First", "Last", "test@email.com", "1234 Test Rd.",
  // "555-555-5555");
  // User empCopy = new User("Copy", "Other", "test@email.com", "1234 Test Rd.",
  // "555-555-5555");
  // //Optional<User> empty = Optional.empty();
  // //roles.add(emp);
  // uServ.registerUser(emp);
  // Exception exception = assertThrows(EmailAlreadyExistsException.class, () ->
  // uServ.registerUser(empCopy));
  // assertEquals("This email address is not available. Please log in or register
  // with a different email address.", exception.getMessage());
  // }
  //
  // @Test
  // public void testSuccessfulLogin() throws Exception {
  // //List<User> roles = new ArrayList<>();
  // User emp = new User("First", "Last", "test@email.com", "1234 Test Rd.",
  // "555-555-5555");
  // uServ.registerUser(emp);
  // assertEquals(uServ.loginUser("test@email.com","password"),emp);
  // }
  //
  // @Test
  // public void testUnsuccessfulLogin() throws Exception {
  // //List<User> roles = new ArrayList<>();
  // User emp = new User("First", "Last", "test@email.com", "1234 Test Rd.",
  // "555-555-5555", "password");
  // uServ.registerUser(emp);
  // //assertEquals(uServ.loginUser("test@email.com","password"),emp);
  // Exception exception = assertThrows(InvalidCredentialsException.class, () ->
  // uServ.loginUser("test@email.com","asdf"));
  // assertEquals("Incorrect username or password.", exception.getMessage());
  // Exception exception1 = assertThrows(InvalidCredentialsException.class, () ->
  // uServ.loginUser("wrong@email.com","password"));
  // assertEquals("Incorrect username or password.", exception1.getMessage());
  // }
  //
  // @Test
  // public void testGetUser() throws Exception {
  // //List<User> roles = new ArrayList<>();
  // User emp = new User("First", "Last", "test@email.com", "1234 Test Rd.",
  // "555-555-5555", "password");
  // uServ.registerUser(emp);
  // System.out.println(emp);
  // System.out.println(uServ.getUserByEmail("test@email.com"));
  // assertEquals(emp,uServ.getUserByEmail("test@email.com"));
  // assertNull(uServ.getUserByEmail("wrong@email.com"));
  // }
  /*
   * @Test
   * void test() {
   * fail("Not yet implemented");
   * }
   */
}
