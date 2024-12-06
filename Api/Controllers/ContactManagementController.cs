using Microsoft.AspNetCore.Mvc;

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
        return Storage.CreateContact(contact)
            ? Created($"http://localhost:5000/api/ContactManagement/contacts/{contact.Id}", contact)
            : Conflict($"Произошла ошибка при добавлении контакта {contact.Name}");
    }

    [HttpGet("contacts")]
    public ActionResult<List<Contact>> GetAllContacts()
    {
        var ContactsData = Storage.GetAllContacts();

        if (ContactsData.Count == 0) return Conflict("Список контактов пуст!");

        return Ok(ContactsData);
    }

    [HttpGet("contacts/{id}")]
    public IActionResult GetContactById(string id)
    {
        (bool IsGuid, Contact contact) =  Storage.GetContactById(id);

        if (!IsGuid) 
            return BadRequest("Введен неккоректный ID. Необходим формат GUID.");

        return contact is not null 
            ? Ok(contact) 
            : NotFound("Контакт не найден!");
    }

    [HttpDelete("contacts/{id}")]
    public IActionResult DeleteContact(Guid id)
    {
        var result = Storage.DeleteContact(id);

        return result 
            ? NoContent()
            : NotFound(new {Error = "Контакта с таким ID не существует!"});
    }

    [HttpPut("contacts/{id}")]
    public IActionResult UpdateContact([FromBody] ContactDto updatedContact, Guid id)
    {
        return Storage.UpdateContact(updatedContact, id)
            ? Ok() 
            : NotFound();
    }
}
