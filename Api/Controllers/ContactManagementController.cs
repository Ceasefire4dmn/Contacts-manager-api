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
        Storage.CreateContact(contact);
        return Created($"http://localhost:5000/api/ContactManagement/contacts/{contact.Id}", contact);
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
        var tuple = Storage.GetContactById(id);

        if (!tuple.Item1) return BadRequest("Введен неккоректный ID. Необходим формат GUID.");

        return tuple.Item2 is not null ? Ok(tuple.Item2) : NotFound("Контакт не найден!");
    }

    [HttpDelete("contacts/{id}")]
    public IActionResult DeleteContact(Guid id)
    {
        var result = Storage.DeleteContact(id);

        return result is not null ? Ok($"Контакт {result.Name} успешно удалён") : NotFound("Такого контакта нет!");
    }

    [HttpPut("contacts/{id}")]
    public IActionResult UpdateContact([FromBody] ContactDto updatedContact, Guid id)
    {
        return Storage.UpdateContact(updatedContact, id) ? Ok("Изменения внесены!") : NotFound("Contact Not Found");
    }
}
