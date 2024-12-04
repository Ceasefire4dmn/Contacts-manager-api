using Microsoft.AspNetCore.Mvc;

public class ContactManagementController : BaseController
{
    private readonly ContactStorage Storage;
    public ContactManagementController(ContactStorage Storage)
    {
        this.Storage = Storage;
    }

    [HttpPost("contacts")]
    public IActionResult CreateContact(Contact contact)
    {
        if (contact.Id.GetType() != typeof(Guid))
        {
            contact.Id = new Guid();
        }

        if (string.IsNullOrWhiteSpace(contact.Name))
        {
            contact.Name = $"Unknown.{DateTime.Now}"; 
        }
        if (string.IsNullOrWhiteSpace(contact.Email))
        {
            contact.Email = "Unknown email";
        }

        if (string.IsNullOrWhiteSpace(contact.PhoneNumber))
        {
            contact.PhoneNumber = "Not provided";
        }

        Storage.Contacts.Add(contact);
        
        return Ok($"Contact {contact.Name} created successfully on {DateTime.Now.ToString("D")}.");
    }

    [HttpGet("contacts")]
    public IActionResult GetContactsFullInfo()
    {
        if (Storage.Contacts.Count == 0) return Ok("Список контактов пуст!");

        return Ok(Storage.Contacts);
    }

    [HttpDelete("contacts/{id}")]
    public IActionResult DeleteContact(Guid id)
    {
        Contact? contact = Storage.Contacts.FirstOrDefault(c => c.Id == id);

        if (contact == null) return Ok("Такого контакта нет!");

        Storage.Contacts.Remove(contact);
        return Ok($"Контакт {contact.Name} успешно удалён");
    }
}
