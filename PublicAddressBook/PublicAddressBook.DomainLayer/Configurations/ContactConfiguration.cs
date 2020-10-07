using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PublicAddressBook.DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PublicAddressBook.DomainLayer.Configurations
{
    public class ContactConfiguration : IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> builder)
        {
            builder.OwnsOne(x => x.Address);
            builder.Property(x => x.FullName).HasMaxLength(50);

            builder.HasMany(t => t.PhoneNumbers)
                    .WithOne(p => p.Contact)
                    .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
