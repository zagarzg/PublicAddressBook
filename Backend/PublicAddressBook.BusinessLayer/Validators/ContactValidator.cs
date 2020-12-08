using FluentValidation;
using PublicAddressBook.DomainLayer.Entities;
using PublicAddressBook.PersistanceLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PublicAddressBook.BusinessLayer.Validators
{
    public class ContactValidator : AbstractValidator<ContactDTO>
    {
        public ContactValidator()
        {
            RuleFor(x => x.FullName).Cascade(CascadeMode.StopOnFirstFailure).NotEmpty().WithMessage("Full name is required")
                                    .Must(fullName => IsNameAndSurname(fullName)).WithMessage("Full name must contain name and surname")
                                    .Must(fullName => AllLetters(fullName)).WithMessage("Full name must contain only letters");

            RuleFor(x => x.Address.City).Cascade(CascadeMode.StopOnFirstFailure).NotEmpty().WithMessage("City is required");
            RuleFor(x => x.Address.Street).Cascade(CascadeMode.StopOnFirstFailure).NotEmpty().WithMessage("Street is required");
            RuleFor(x => x.Address.HouseNumber).Cascade(CascadeMode.StopOnFirstFailure).NotEmpty().WithMessage("House number is required");

            //RuleFor(x => x.DateOfBirth).Cascade(CascadeMode.StopOnFirstFailure).NotEmpty().WithMessage("Date of birth is required")
            //                           .Must(dateOfBirth => IsBornedInFuture(dateOfBirth)).WithMessage("Contact cannot be borned in future")
            //                           .Must(dateOfBirth => IsOlderThan130(dateOfBirth)).WithMessage("Contact cannot be older than 130 years old");
        }

        public bool AllLetters(string fullName)
        {
            string[] splitedFullName = fullName.Split(' ');

            foreach (var name in splitedFullName)
            {
                if (!name.All(Char.IsLetter))
                {
                    return false;
                }
            }
            return true;
        }

        public bool IsNameAndSurname(string fullName)
        {
            string[] splitedFullName = fullName.Split(' ');

            return splitedFullName.Length > 1 && splitedFullName.Length < 100;

        }

        public bool IsOlderThan130(DateTime dateOfBirth)
        {
            return DateTime.Now.Year - dateOfBirth.Year < 130;
        }

        public bool IsBornedInFuture(DateTime dateOfBirth)
        {
            return dateOfBirth < DateTime.Now;
        }
    }
}
