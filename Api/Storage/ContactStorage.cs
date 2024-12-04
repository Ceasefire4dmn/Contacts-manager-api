using Bogus;
public class ContactStorage
{
    public ContactStorage()
    {
        this.Contacts = new List<Contact>();

        for (int i = 0; i < 10; i++)
        {
            Contacts.Add(new Contact()
                {
                    Id = Guid.NewGuid(),
                    Name = new Faker().Name.FullName(),
                    PhoneNumber = new Faker().Phone.PhoneNumber(),
                    Email = new Faker().Internet.Email()
            }   
            );
        }
    }
    public List<Contact> Contacts;

}