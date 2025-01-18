using Bogus.DataSets;
using Microsoft.Data.Sqlite;
using System.Text;
public class SqliteStorage : IStorage
{
    private readonly string connectionString;
    public SqliteStorage(string connectionString)
    {
        this.connectionString = connectionString;
    }
    public Contact CreateContact(ContactDto contact)
    {
        using var connection = new SqliteConnection(connectionString);
        connection.Open();

        var command = connection.CreateCommand();

        string query = @"
            INSERT INTO contacts(contact_name, contact_phone_number, contact_email) VALUES (@name, @phoneNumber, @email); 
            
            SELECT contact_id, contact_name, contact_phone_number, contact_email 
            FROM contacts 
            WHERE ROWID = last_insert_rowid();
        ";

        command.CommandText = query;

        command.Parameters.AddWithValue("@name", contact.Name);
        command.Parameters.AddWithValue("@phoneNumber", contact.PhoneNumber);
        command.Parameters.AddWithValue("@email", contact.Email);

        using var reader = command.ExecuteReader();

        if (reader.Read())
        {
            // Создание объекта Contact из результата запроса
            return new Contact
            {
                Id = Guid.Parse(reader.GetString(0)),
                Name = reader.GetString(1),
                PhoneNumber = reader.GetString(2),
                Email = reader.GetString(3)
            };
        }
        
        return null;
    }
    public List<Contact> GetAllContacts()
    {
        var contacts = new List<Contact>();

        using var connection = new SqliteConnection(connectionString);
        connection.Open();

        var command = connection.CreateCommand();
        command.CommandText = "SELECT * FROM Contacts";

        using var reader = command.ExecuteReader();
        while (reader.Read())
        {
            contacts.Add(new Contact()
            {
                Id = reader.GetGuid(0),
                Name = reader.GetString(1),
                PhoneNumber = reader.GetString(2),
                Email = reader.GetString(3)
            });
        }

        return contacts;
    }
    public (bool, Contact) GetContactById(string id)
    {
        if (!Guid.TryParse(id, out _))
            return (false, null);

        using var connection = new SqliteConnection(connectionString);
        connection.Open();

        var command = connection.CreateCommand();

        string query = "SELECT * FROM contacts WHERE contact_id = @id";
        command.CommandText = query;

        command.Parameters.AddWithValue("@id", id);

        using var reader = command.ExecuteReader();
        if (reader.Read())
        {
            return (true, new Contact()
            {
                Id = reader.GetGuid(0),
                Name = reader.GetString(1),
                PhoneNumber = reader.GetString(2),
                Email = reader.GetString(3)
            });
        }

        return (true, null);
    }
    public bool DeleteContact(Guid id)
    {
        using var connection = new SqliteConnection(connectionString);
        connection.Open();

        var command = connection.CreateCommand();

        string query = "DELETE FROM Contacts WHERE contact_id = @id";
        command.CommandText = query;

        command.Parameters.AddWithValue("@id", id.ToString());

        return command.ExecuteNonQuery() > 0;
    }
    public bool UpdateContact(ContactDto updatedContact, Guid id)
    {
        using var connection = new SqliteConnection(connectionString);
        connection.Open();

        var command = connection.CreateCommand();

        var queryBuilder = new StringBuilder("UPDATE contacts SET ");
        var parameters = new List<SqliteParameter>();

        if (!string.IsNullOrEmpty(updatedContact.Name))
        {
            queryBuilder.Append("contact_name = @name, ");
            parameters.Add(new SqliteParameter("@name", updatedContact.Name));
        }

        if (!string.IsNullOrEmpty(updatedContact.PhoneNumber))
        {
            queryBuilder.Append("contact_phone_number = @phoneNumber, ");
            parameters.Add(new SqliteParameter("@phoneNumber", updatedContact.PhoneNumber));
        }

        if (!string.IsNullOrEmpty(updatedContact.Email))
        {
            queryBuilder.Append("contact_email = @email, ");
            parameters.Add(new SqliteParameter("@email", updatedContact.Email));
        }

        if (parameters.Count == 0)
        {
            return false; // Нечего обновлять
        }

        parameters.Add(new SqliteParameter("@id", id.ToString()));

        command.CommandText = queryBuilder.ToString().TrimEnd(',', ' ') + " WHERE contact_id = @id";

        command.Parameters.AddRange(parameters.ToArray());

        return command.ExecuteNonQuery() > 0;
    }

}