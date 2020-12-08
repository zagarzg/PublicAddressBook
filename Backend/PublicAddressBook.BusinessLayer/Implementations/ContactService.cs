using AutoMapper;
using FluentValidation.Results;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using PublicAddressBook.BusinessLayer.Exceptions;
using PublicAddressBook.BusinessLayer.Interfaces;
using PublicAddressBook.BusinessLayer.Validators;
using PublicAddressBook.DomainLayer.Entities;
using PublicAddressBook.DomainLayer.Enums;
using PublicAddressBook.DomainLayer.Helpers;
using PublicAddressBook.PersistanceLayer.DTOs;
using PublicAddressBook.PersistanceLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace PublicAddressBook.BusinessLayer.Implementations
{
    internal class ContactService : IContactService
    {
        private readonly IRepository<Contact> _repository;
        private readonly IMapper _mapper;
        private readonly ContactValidator _validator = new ContactValidator();

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

            if (contact == null)
                throw new NotFoundException(id);

            return _mapper.Map<ContactDTO>(contact);
        }

        public async Task<PagedList<ContactDTO>> GetAll(ContactParameters contactParameters, CancellationToken cancellationToken = default)
        {
            var contacts = await _repository.GetAll(
                include: source => source
                    .Include(c => c.PhoneNumbers),
                filter: GetFilter(contactParameters.SearchString),
                orderBy: GetSort(contactParameters.OrderBy, contactParameters.SortDirection),
                cancellationToken: cancellationToken);

            var mappedContacts = _mapper.Map<IEnumerable<ContactDTO>>(contacts);



            return PagedList<ContactDTO>.ToPagedList(mappedContacts, contactParameters.PageNumber, contactParameters.PageSize);
        }

        public async Task<Contact> Update(ContactDTO contact, CancellationToken cancellationToken)
        {
            ValidationResult result = _validator.Validate(contact);

            if (!result.IsValid)
            {
                ValidationException exception = new ValidationException(nameof(contact));
                foreach (ValidationFailure failure in result.Errors)
                {
                    exception._errors.Add(failure.PropertyName, failure.ErrorMessage);
                }

                throw exception;
            }

            try
            {
                var contactEntity = _mapper.Map<Contact>(contact);
                await _repository.Update(contactEntity, cancellationToken);
                return contactEntity;
            }
            catch (Exception e)
            {
                throw new UpdateException(contact.Id, e);
            }

        }

        public async Task<Contact> Create(ContactDTO contact, CancellationToken cancellationToken)
        {
            ValidationResult result = _validator.Validate(contact);

            if (!result.IsValid)
            {
                ValidationException exception = new ValidationException(nameof(contact));
                foreach (ValidationFailure failure in result.Errors)
                {
                    exception._errors.Add(failure.PropertyName, failure.ErrorMessage);
                }

                throw exception;
            }

            try
            {
                var contactEntity = _mapper.Map<Contact>(contact);
                await _repository.Insert(contactEntity, cancellationToken);
                return contactEntity;
            }
            catch (Exception e)
            {
                throw new CreateException(e);
            }
        }

        public async Task Delete(Guid id, CancellationToken cancellationToken)
        {
            try
            {
                await _repository.Delete(id, cancellationToken);
            }
            catch (Exception e)
            {
                throw new DeleteException(id, e);
            }
        }

        internal Expression<Func<Contact, bool>> GetFilter(string searchString)
        {
            if (string.IsNullOrWhiteSpace(searchString))
                return null;

            var query = searchString.Trim().ToLower();

            var predicate = PredicateBuilder.New<Contact>();
            predicate.Or(contact => contact.Address.City.ToLower().Contains(query));
            predicate.Or(contact => contact.Address.Street.ToLower().Contains(query));
            predicate.Or(contact => contact.FullName.ToLower().StartsWith(query));

            return predicate;
        }

        internal Func<IQueryable<Contact>, IQueryable<Contact>> GetSort(string orderBy, SortDirection? sortDirection)
        {
            if (sortDirection == null)
                return null;

            if (string.IsNullOrWhiteSpace(orderBy))
                return null;

            return contacts =>
            {
                switch (orderBy)
                {
                    case "fullName":
                        if (sortDirection == SortDirection.asc)
                        {
                            contacts = contacts.OrderBy(x => x.FullName);
                        }
                        else
                        {
                            contacts = contacts.OrderByDescending(x => x.FullName);
                        }
                        break;

                    case "city":
                        if (sortDirection == SortDirection.asc)
                        {
                            contacts = contacts.OrderBy(x => x.Address.City);
                        }
                        else
                        {
                            contacts = contacts.OrderByDescending(x => x.Address.City);
                        }
                        break;

                    case "street":
                        if (sortDirection == SortDirection.asc)
                        {
                            contacts = contacts.OrderBy(x => x.Address.Street);
                        }
                        else
                        {
                            contacts = contacts.OrderByDescending(x => x.Address.Street);
                        }
                        break;
                }

                return contacts;
            };
        }
    }
}
