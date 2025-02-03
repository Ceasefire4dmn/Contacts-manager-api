using System.ComponentModel.DataAnnotations;

public class Contact
{
    [Key]
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    
}