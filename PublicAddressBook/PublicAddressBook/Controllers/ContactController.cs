using Microsoft.AspNetCore.Mvc;
using PublicAddressBook.BusinessLayer.Interfaces;
using PublicAddressBook.DomainLayer.Entities;
using PublicAddressBook.PersistanceLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace PublicAddressBook.Controllers
{
    public class ContactController : BaseController
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken = default)
        {
            return Ok(await _contactService.GetAll(cancellationToken));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id, CancellationToken cancellationToken = default)
        {
            return Ok(await _contactService.Get(id, cancellationToken));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ContactDTO contact, CancellationToken cancellationToken = default)
        {
            return Ok(await _contactService.Create(contact, cancellationToken));
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ContactDTO contact, CancellationToken cancellationToken = default)
        {
            return Ok(await _contactService.Create(contact, cancellationToken));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken = default)
        {
            await _contactService.Delete(id, cancellationToken);
            return Ok();
        }
    }
}
