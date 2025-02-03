using Microsoft.AspNetCore.Mvc;

public class ContactManagementController : BaseController
{
    private static readonly string baseUrl = Environment.GetEnvironmentVariable("CONTACT_API");
    private readonly IStorage Storage;
    public ContactManagementController(IStorage Storage)
    {
        this.Storage = Storage;
    }

    [HttpPost("contacts")]
    public IActionResult CreateContact([FromBody] ContactDto contact)
    {
        Contact CreatedContact = Storage.CreateContact(contact);
        return CreatedContact != null
            ? Created($"{baseUrl}{CreatedContact.Id}", CreatedContact)
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
    public IActionResult GetContactById(Guid id)
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
