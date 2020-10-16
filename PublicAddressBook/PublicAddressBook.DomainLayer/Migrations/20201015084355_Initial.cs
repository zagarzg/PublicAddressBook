using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PublicAddressBook.DomainLayer.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    FullName = table.Column<string>(maxLength: 50, nullable: true),
                    Address_City = table.Column<string>(nullable: true),
                    Address_Street = table.Column<string>(nullable: true),
                    Address_HouseNumber = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhoneNumbers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CallingCode = table.Column<string>(nullable: true),
                    Number = table.Column<string>(nullable: true),
                    ContactId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhoneNumbers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhoneNumbers_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "DateOfBirth", "FullName", "Address_City", "Address_HouseNumber", "Address_Street" },
                values: new object[] { new Guid("0faee6ac-1772-4bbe-9990-a7d9a22dd559"), new DateTime(1982, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Mario Rozic", "Bogota", "10", "Las Venturas" });

            migrationBuilder.InsertData(
                table: "PhoneNumbers",
                columns: new[] { "Id", "CallingCode", "ContactId", "Number" },
                values: new object[] { new Guid("a20dd3ff-f04e-4863-84dd-89a3f6ba1be2"), "+385", new Guid("0faee6ac-1772-4bbe-9990-a7d9a22dd559"), "952345432" });

            migrationBuilder.InsertData(
                table: "PhoneNumbers",
                columns: new[] { "Id", "CallingCode", "ContactId", "Number" },
                values: new object[] { new Guid("d169a65c-49f6-4982-9ef8-a6cf7b384358"), "+385", new Guid("0faee6ac-1772-4bbe-9990-a7d9a22dd559"), "912341325" });

            migrationBuilder.CreateIndex(
                name: "IX_PhoneNumbers_ContactId",
                table: "PhoneNumbers",
                column: "ContactId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PhoneNumbers");

            migrationBuilder.DropTable(
                name: "Contacts");
        }
    }
}
