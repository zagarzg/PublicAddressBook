using PublicAddressBook.DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PublicAddressBook.BusinessLayer.Interfaces
{
    public interface IContactService
    {
        Task<IEnumerable<Contact>> GetAll();
        Task <Contact> Get(Guid id);
        Task <Guid> Create(Contact contact);
        Task Update(Guid id, Contact contact);
        Task Delete(Guid id);
    }
}
