using Microsoft.EntityFrameworkCore;


public class SqliteDbContext : DbContext 
{
    public DbSet<Contact> contacts {get; set;}

    public SqliteDbContext(DbContextOptions<SqliteDbContext> options) 
        : base(options) 
            { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Contact>()
            .ToTable("сontacts")  
            .HasKey(c => c.Id); 

        modelBuilder.Entity<Contact>()
            .Property(c => c.Id)
            .HasColumnName("contact_id");  

        modelBuilder.Entity<Contact>()
            .Property(c => c.Name)
            .HasColumnName("contact_name");

        modelBuilder.Entity<Contact>()
            .Property(c => c.PhoneNumber)
            .HasColumnName("contact_phone_number");

        modelBuilder.Entity<Contact>()
            .Property(c => c.Email)
            .HasColumnName("contact_email");
    }

}