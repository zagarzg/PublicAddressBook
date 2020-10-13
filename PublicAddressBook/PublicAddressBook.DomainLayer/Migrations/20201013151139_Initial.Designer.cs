﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PublicAddressBook.DomainLayer;

namespace PublicAddressBook.DomainLayer.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20201013151139_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("PublicAddressBook.DomainLayer.Entities.Contact", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Contacts");

                    b.HasData(
                        new
                        {
                            Id = new Guid("0faee6ac-1772-4bbe-9990-a7d9a22dd559"),
                            DateOfBirth = new DateTime(1982, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            FirstName = "Mario",
                            LastName = "Rozic"
                        });
                });

            modelBuilder.Entity("PublicAddressBook.DomainLayer.Entities.PhoneNumber", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CallingCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("ContactId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Number")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ContactId");

                    b.ToTable("PhoneNumbers");

                    b.HasData(
                        new
                        {
                            Id = new Guid("a20dd3ff-f04e-4863-84dd-89a3f6ba1be2"),
                            CallingCode = "+385",
                            ContactId = new Guid("0faee6ac-1772-4bbe-9990-a7d9a22dd559"),
                            Number = "952345432"
                        },
                        new
                        {
                            Id = new Guid("d169a65c-49f6-4982-9ef8-a6cf7b384358"),
                            CallingCode = "+385",
                            ContactId = new Guid("0faee6ac-1772-4bbe-9990-a7d9a22dd559"),
                            Number = "912341325"
                        });
                });

            modelBuilder.Entity("PublicAddressBook.DomainLayer.Entities.Contact", b =>
                {
                    b.OwnsOne("PublicAddressBook.DomainLayer.ValueObjects.Address", "Address", b1 =>
                        {
                            b1.Property<Guid>("ContactId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<string>("City")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("HouseNumber")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("Street")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("ContactId");

                            b1.ToTable("Contacts");

                            b1.WithOwner()
                                .HasForeignKey("ContactId");

                            b1.HasData(
                                new
                                {
                                    ContactId = new Guid("0faee6ac-1772-4bbe-9990-a7d9a22dd559"),
                                    City = "Bogota",
                                    HouseNumber = "10",
                                    Street = "Las Venturas"
                                });
                        });
                });

            modelBuilder.Entity("PublicAddressBook.DomainLayer.Entities.PhoneNumber", b =>
                {
                    b.HasOne("PublicAddressBook.DomainLayer.Entities.Contact", "Contact")
                        .WithMany("PhoneNumbers")
                        .HasForeignKey("ContactId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
