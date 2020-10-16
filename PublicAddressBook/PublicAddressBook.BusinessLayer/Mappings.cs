using AutoMapper;
using PublicAddressBook.DomainLayer.Entities;
using PublicAddressBook.PersistanceLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace PublicAddressBook.BusinessLayer
{
    public class Mappings : Profile
    {
        public Mappings()
        {
            CreateMap<Contact, ContactDTO>().ReverseMap();
            CreateMap<PhoneNumber, PhoneNumberDTO>().ReverseMap();
        }
    }
}
