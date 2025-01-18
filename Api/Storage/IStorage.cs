
public interface IStorage
{
    Contact CreateContact(ContactDto contact);
    List<Contact> GetAllContacts();
    (bool, Contact) GetContactById(string id);
    bool DeleteContact(Guid id);
    bool UpdateContact(ContactDto updatedContact, Guid id);
}