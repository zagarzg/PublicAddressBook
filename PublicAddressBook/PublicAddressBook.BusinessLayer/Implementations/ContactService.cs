using PublicAddressBook.BusinessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PublicAddressBook.BusinessLayer.Implementations
{
    internal class ContactService : IContactService
    {
        public async Task<Contact> Get(Guid id)
        {
            throw new NotImplementedException($"Getting {id}");
        }

        public Task<IEnumerable<Contact>> GetAll()
        {
            throw new NotImplementedException("Getting all");
        }

        public async Task Update(Guid id, Contact contact)
        {
            throw new NotImplementedException($"Updating {id}");
        }

        public async Task<Guid> Create(Contact contact)
        {
            throw new NotImplementedException("Creating");
        }

        public async Task Delete(Guid id)
        {
            throw new NotImplementedException($"Deleting {id}");
        }
    }
}
