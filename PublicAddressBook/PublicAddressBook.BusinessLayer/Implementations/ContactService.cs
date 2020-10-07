using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using PublicAddressBook.BusinessLayer.Interfaces;
using PublicAddressBook.DomainLayer.Entities;
using PublicAddressBook.PersistanceLayer.DTOs;
using PublicAddressBook.PersistanceLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PublicAddressBook.BusinessLayer.Implementations
{
    internal class ContactService : IContactService
    {
        private readonly IRepository<Contact> _repository;
        private readonly IMapper _mapper;

        public ContactService(IRepository<Contact> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<ContactDTO> Get(Guid id, CancellationToken cancellationToken)
        {
            var contact = await _repository.Get(
                filter: dbContact => dbContact.Id == id,
                include: src => src
                    .Include(c => c.PhoneNumbers),
                cancellationToken: cancellationToken);

            return _mapper.Map<ContactDTO>(contact);
        }

        public async Task<IEnumerable<ContactDTO>> GetAll(CancellationToken cancellationToken = default)
        {
            var contacts = await _repository.GetAll(
                include: source => source
                    .Include(c => c.PhoneNumbers),
                cancellationToken: cancellationToken);

            return _mapper.Map<IEnumerable<ContactDTO>>(contacts);
        }

        public async Task Update(ContactDTO contact, CancellationToken cancellationToken)
        {
            var contactEntity = _mapper.Map<Contact>(contact);
            await _repository.Update(contactEntity, cancellationToken);
        }

        public async Task<Guid> Create(ContactDTO contact, CancellationToken cancellationToken)
        {
            var contactEntity = _mapper.Map<Contact>(contact);
            return await _repository.Insert(contactEntity, cancellationToken);
        }

        public async Task Delete(Guid id, CancellationToken cancellationToken)
        {
            await _repository.Delete(id, cancellationToken);
        }
    }
}
