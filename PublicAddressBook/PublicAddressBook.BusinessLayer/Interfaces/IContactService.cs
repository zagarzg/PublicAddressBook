using PublicAddressBook.DomainLayer.Entities;
using PublicAddressBook.PersistanceLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PublicAddressBook.BusinessLayer.Interfaces
{
    public interface IContactService
    {
        Task<IEnumerable<ContactDTO>> GetAll(CancellationToken cancellation = default);
        Task<ContactDTO> Get(Guid id, CancellationToken cancellationToken = default);
        Task <Contact> Create(ContactDTO contact, CancellationToken cancellationToken = default);
        Task <Contact> Update(ContactDTO contact, CancellationToken cancellationToken = default);
        Task Delete(Guid id, CancellationToken cancellationToken = default);
    }
}
