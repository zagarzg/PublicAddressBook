using System;
using System.Collections.Generic;
using System.Text;

namespace PublicAddressBook.DomainLayer.Interfaces
{
    public interface IEntity
    {
        Guid Id { get; set; }
    }
}
