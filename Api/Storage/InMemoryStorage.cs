using Bogus;


public class InMemoryStorage : IStorage
{
    private List<Contact> Contacts;

    public InMemoryStorage()
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

    public Contact CreateContact(ContactDto contact)
    {
        var CreatedContact = new Contact();

        CreatedContact.Id = Guid.NewGuid(); ;

        CreatedContact.Name = 
                            string.IsNullOrWhiteSpace(contact.Name) 
                            ? $"Unknown.{DateTime.Now}"
                            : contact.Name;

        CreatedContact.Email = 
                             string.IsNullOrWhiteSpace(contact.Email)
                             ? "Unknown"
                             : contact.Email;

        CreatedContact.PhoneNumber =
                                   string.IsNullOrWhiteSpace(contact.PhoneNumber)
                                   ? "Unknown"
                                   : contact.PhoneNumber;
        
        Contacts.Add(CreatedContact);

        return CreatedContact;
    }

    public List<Contact> GetAllContacts()
    {
        if (Contacts.Count == 0) return new List<Contact>();

        return Contacts;
    }

    public (bool, Contact) GetContactById(Guid id)
    {
        // bool IsGuid = Guid.TryParse(id, out Guid potentialId);
        bool IsGuid = Guid.TryParse(id.ToString(), out Guid potentialId);

        return IsGuid
            ? (IsGuid, Contacts.FirstOrDefault(c => c.Id == potentialId))
            : (IsGuid, null);
    }
    public bool DeleteContact(Guid id)
    {
        var contact = Contacts.FirstOrDefault(c => c.Id == id);

        if (contact == null) return false;

        Contacts.Remove(contact);

        return true;

    }

    public bool UpdateContact(ContactDto updatedContact, Guid id)
    {
        var contact = Contacts.FirstOrDefault(c => c.Id == id);

        if (contact == null) return false;

        if (!string.IsNullOrWhiteSpace(updatedContact.Name)) contact.Name = updatedContact.Name;

        if (!string.IsNullOrWhiteSpace(updatedContact.PhoneNumber)) contact.PhoneNumber = updatedContact.PhoneNumber;

        if (!string.IsNullOrWhiteSpace(updatedContact.Email)) contact.Email = updatedContact.Email;

        return true;

    }


}