using Bogus;
public class ContactStorage
{
    private List<Contact> Contacts;

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

    public string CreateContact(Contact contact)
    {
        Guid potentialId = Guid.NewGuid();
        while(Contacts.FirstOrDefault(c => c.Id == potentialId) != null) 
        {
            potentialId = Guid.NewGuid();
        }
        contact.Id = potentialId;

        if (string.IsNullOrWhiteSpace(contact.Name))
        {
            contact.Name = $"Unknown.{DateTime.Now}";
        }

        if (string.IsNullOrWhiteSpace(contact.Email))
        {
            contact.Email = "Unknown";
        }

        if (string.IsNullOrWhiteSpace(contact.PhoneNumber))
        {
            contact.PhoneNumber = "Unknown";
        }

        Contacts.Add(contact);

        return $"Contact {contact.Name} created successfully on {DateTime.Now.ToString("D")}.";

    }

    public List<Contact> GetAllContacts()
    {
        if (Contacts.Count == 0) return new List<Contact>();

        return Contacts;
    }

    public (bool, Contact) GetContactById(string id)
    {
        bool IsGuid = Guid.TryParse(id, out Guid potentialId);

        return IsGuid ? (IsGuid, Contacts.FirstOrDefault(c => c.Id == potentialId)) : (IsGuid, null);
    }
    public Contact DeleteContact(Guid id)
    {
        var contact = Contacts.FirstOrDefault(c => c.Id == id);

        if (contact == null) return null;

        Contacts.Remove(contact);

        return contact;

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