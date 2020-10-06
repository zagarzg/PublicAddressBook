using System;
using System.Collections.Generic;
using System.Text;

namespace PublicAddressBook.DomainLayer.Entities
{
    public class Contact
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public ICollection<string> PhoneNumbers { get; set; } = new HashSet<string>();
    }
}
