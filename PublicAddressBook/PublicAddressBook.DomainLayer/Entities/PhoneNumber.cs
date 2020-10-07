using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace PublicAddressBook.DomainLayer.Entities
{
    public class PhoneNumber : BaseEntity
    {
        public string CallingCode { get; set; }
        public string Number { get; set; }

        public Guid ContactId { get; set; }
       
        public virtual Contact Contact { get; set; }
      
    }
}
