using Microsoft.EntityFrameworkCore;
using PublicAddressBook.DomainLayer.Entities;
using PublicAddressBook.DomainLayer.ValueObjects;
using System;
using System.Collections.Generic;
using System.Text;

namespace PublicAddressBook.DomainLayer
{
    public static class DbSeeder
    {
        public static void Seed(this ModelBuilder builder)
        {
            builder.SeedContacts();
            builder.SeedPhoneNumbers();
        }

        
        private static void SeedContacts(this ModelBuilder builder)
        {
            
            var contact = new Contact()
            {
                Id = Guid.Parse("0faee6ac-1772-4bbe-9990-a7d9a22dd559"),
                FullName = "Mario Rožić",
                DateOfBirth = new DateTime(1982, 6, 1),
            };

            builder.Entity<Contact>().HasData(contact);

            var address = new
            {
                ContactId = Guid.Parse("0faee6ac-1772-4bbe-9990-a7d9a22dd559"),
                City = "Bogota",
                Street = "Las Venturas",
                HouseNumber = "10"
            };

            builder.Entity<Contact>().OwnsOne(x => x.Address).HasData(address);
        }

        private static void SeedPhoneNumbers(this ModelBuilder builder)
        {
            var phoneNumbers = new List<PhoneNumber>()
            {
                new PhoneNumber()
                {
                    Id = Guid.Parse("a20dd3ff-f04e-4863-84dd-89a3f6ba1be2"),
                    ContactId = Guid.Parse("0faee6ac-1772-4bbe-9990-a7d9a22dd559"),
                    CallingCode = "+385",
                    Number = "952345432"
                },
                new PhoneNumber()
                {
                    Id = Guid.Parse("d169a65c-49f6-4982-9ef8-a6cf7b384358"),
                    ContactId = Guid.Parse("0faee6ac-1772-4bbe-9990-a7d9a22dd559"),
                    CallingCode = "+385",
                    Number = "912341325"
                }
            };

            builder.Entity<PhoneNumber>().HasData(phoneNumbers);
        }
    }
}
