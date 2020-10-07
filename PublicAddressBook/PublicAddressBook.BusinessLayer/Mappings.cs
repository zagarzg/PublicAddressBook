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

            CreateMap<Contact, ContactDTO>()
                .ForMember(dest =>
                dest.FullName,
                opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
                .ReverseMap()
                .ForMember(dest =>
                dest.FirstName,
                opt => opt.MapFrom(src => src.FullName.Split(new[] { ' ' }, 2).ToList()[0]))
                .ForMember(dest =>
                dest.LastName,
                opt => opt.MapFrom(src => src.FullName.Split(new[] { ' ' }, 2).ToList()[1]));

            CreateMap<PhoneNumber, PhoneNumberDTO>().ReverseMap();

        }

        
    }
}
