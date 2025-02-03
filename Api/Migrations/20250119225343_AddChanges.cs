using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class AddChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Contacts",
                table: "Contacts");

            migrationBuilder.RenameTable(
                name: "Contacts",
                newName: "сontacts");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "сontacts",
                newName: "contact_phone_number");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "сontacts",
                newName: "contact_name");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "сontacts",
                newName: "contact_email");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "сontacts",
                newName: "contact_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_сontacts",
                table: "сontacts",
                column: "contact_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_сontacts",
                table: "сontacts");

            migrationBuilder.RenameTable(
                name: "сontacts",
                newName: "Contacts");

            migrationBuilder.RenameColumn(
                name: "contact_phone_number",
                table: "Contacts",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "contact_name",
                table: "Contacts",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "contact_email",
                table: "Contacts",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "contact_id",
                table: "Contacts",
                newName: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Contacts",
                table: "Contacts",
                column: "Id");
        }
    }
}
