public class SqliteEfStorage : IStorage
{
    private readonly SqliteDbContext context;

    public SqliteEfStorage(SqliteDbContext context)
    {
        this.context = context;
    }
    public Contact CreateContact(ContactDto contactDto)
    {
        Contact contact = new()
        {
            Name = contactDto.Name,
            PhoneNumber = contactDto.PhoneNumber,
            Email = contactDto.Email
        };
        context.contacts.Add(contact);
        context.SaveChanges();
        return contact;

    }
    public List<Contact> GetAllContacts()
    {
        return context.contacts.ToList();
    }
    public (bool, Contact) GetContactById(Guid id)
    {
        var contact = context.contacts.Find(id);
        return contact == null ? (false, null) : (true, contact);
    }
    public bool DeleteContact(Guid id)
    {
        var contact = context.contacts.Find(id);
        if (contact != null) 
        {
            context.contacts.Remove(contact);
            context.SaveChanges();
        }
        return contact != null;
    }
    public bool UpdateContact(ContactDto updatedContact, Guid id)
    {
        if (updatedContact == null)
        {
            return false;
        }

        var contact = context.contacts.FirstOrDefault(c => c.Id == id);

        if (contact == null)
        {
            return false;
        }

        // Обновляем только непустые значения
        if (!string.IsNullOrEmpty(updatedContact.Name))
        {
            contact.Name = updatedContact.Name;
        }

        if (!string.IsNullOrEmpty(updatedContact.PhoneNumber))
        {
            contact.PhoneNumber = updatedContact.PhoneNumber;
        }

        if (!string.IsNullOrEmpty(updatedContact.Email))
        {
            contact.Email = updatedContact.Email;
        }

        context.SaveChanges();
        return true;
    }
}