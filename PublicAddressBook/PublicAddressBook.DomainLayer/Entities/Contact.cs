using PublicAddressBook.DomainLayer.ValueObjects;
using System;
using System.Collections.Generic;
using System.Text;

namespace PublicAddressBook.DomainLayer.Entities
{
    public class Contact
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public Address Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public List<PhoneNumber> PhoneNumbers { get; set; } 
    }
}
