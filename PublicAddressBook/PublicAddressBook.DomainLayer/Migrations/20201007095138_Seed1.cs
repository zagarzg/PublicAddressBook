using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PublicAddressBook.DomainLayer.Migrations
{
    public partial class Seed1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "DateOfBirth", "FullName", "Address_City", "Address_HouseNumber", "Address_Street" },
                values: new object[] { new Guid("0faee6ac-1772-4bbe-9990-a7d9a22dd559"), new DateTime(1982, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Mario Rožić", "Bogota", "10", "Las Venturas" });

            migrationBuilder.InsertData(
                table: "PhoneNumbers",
                columns: new[] { "Id", "CallingCode", "ContactId", "Number" },
                values: new object[,]
                {
                    { new Guid("a20dd3ff-f04e-4863-84dd-89a3f6ba1be2"), "+385", new Guid("0faee6ac-1772-4bbe-9990-a7d9a22dd559"), "952345432" },
                    { new Guid("d169a65c-49f6-4982-9ef8-a6cf7b384358"), "+385", new Guid("0faee6ac-1772-4bbe-9990-a7d9a22dd559"), "912341325" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PhoneNumbers",
                keyColumn: "Id",
                keyValue: new Guid("a20dd3ff-f04e-4863-84dd-89a3f6ba1be2"));

            migrationBuilder.DeleteData(
                table: "PhoneNumbers",
                keyColumn: "Id",
                keyValue: new Guid("d169a65c-49f6-4982-9ef8-a6cf7b384358"));

            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: new Guid("0faee6ac-1772-4bbe-9990-a7d9a22dd559"));
        }
    }
}
