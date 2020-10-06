using Microsoft.AspNetCore.Mvc;
using PublicAddressBook.BusinessLayer.Interfaces;
using PublicAddressBook.DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _contactService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return Ok(await _contactService.Get(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Contact contact)
        {
            return Ok(await _contactService.Create(contact));
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Contact contact)
        {
            return Ok(await _contactService.Create(contact));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _contactService.Delete(id);
            return Ok();
        }
    }
}
