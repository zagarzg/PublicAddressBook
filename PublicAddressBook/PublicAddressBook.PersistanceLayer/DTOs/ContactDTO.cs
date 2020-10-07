using PublicAddressBook.DomainLayer.Entities;
using PublicAddressBook.DomainLayer.ValueObjects;
using System;
using System.Collections.Generic;
using System.Text;

namespace PublicAddressBook.PersistanceLayer.DTOs
{
    public class ContactDTO
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public Address Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public List<PhoneNumberDTO> PhoneNumbers { get; set; }
    }
}
