using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PublicAddressBook.BusinessLayer.Interfaces;
using PublicAddressBook.DomainLayer.Entities;
using PublicAddressBook.DomainLayer.Helpers;
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
        public async Task<IActionResult> GetAll([FromQuery] ContactParameters contactParameters, CancellationToken cancellationToken = default)
        {
            var contacts = await _contactService.GetAll(contactParameters, cancellationToken);

            var metadata = new
            {
                contacts.TotalCount,
                contacts.PageSize,
                contacts.CurrentPage,
                contacts.TotalPages,
                contacts.HasNext,
                contacts.HasPrevios
            };

            Response.Headers.Add("pagination", JsonConvert.SerializeObject(metadata));

            return Ok(contacts);
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
            return Ok(await _contactService.Update(contact, cancellationToken));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken = default)
        {
            await _contactService.Delete(id, cancellationToken);
            return Ok();
        }
    }
}
