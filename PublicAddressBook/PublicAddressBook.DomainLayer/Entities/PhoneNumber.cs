using System;
using System.Collections.Generic;
using System.Text;

namespace PublicAddressBook.DomainLayer.Entities
{
    public class PhoneNumber
    {
        public Guid Id { get; set; }
        public string CallingCode { get; set; }
        public string Number { get; set; }

        public Guid ContactId { get; set; }
        public virtual Contact Contact { get; set; }
      
    }
}
