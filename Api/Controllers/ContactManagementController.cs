using System.Data.SqlTypes;
using Bogus.DataSets;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

public class ContactManagementController : BaseController
{
    private readonly ContactStorage Storage;
    public ContactManagementController(ContactStorage Storage)
    {
        this.Storage = Storage;
    }


    [HttpPost("contacts")]
    public IActionResult CreateContact([FromBody] Contact contact)
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

    [HttpPut("contacts/{id}")]
    public IActionResult UpdateContact([FromBody] ContactDto updatedContact, Guid id)
    {
        var contact = Storage.Contacts.FirstOrDefault(c => c.Id == id);

        if (contact == null) return NotFound("Contact Not Found");

        if (string.IsNullOrWhiteSpace(updatedContact.Name) && string.IsNullOrEmpty(updatedContact.Email) && string.IsNullOrEmpty(updatedContact.PhoneNumber))
        {
            return Ok("Нет изменений для внесения в данный контакт");
        }

        if (!string.IsNullOrWhiteSpace(updatedContact.Name)) contact.Name = updatedContact.Name;

        if (!string.IsNullOrWhiteSpace(updatedContact.PhoneNumber)) contact.PhoneNumber = updatedContact.PhoneNumber;

        if (!string.IsNullOrWhiteSpace(updatedContact.Email)) contact.Email = updatedContact.Email;

        return Ok("Изменения внесены!");

    }
}
