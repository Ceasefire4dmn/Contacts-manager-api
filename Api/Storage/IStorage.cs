
public interface IStorage
{
    bool CreateContact(Contact contact);
    List<Contact> GetAllContacts();
    (bool, Contact) GetContactById(string id);
    bool DeleteContact(Guid id);
    bool UpdateContact(ContactDto updatedContact, Guid id);
}