using Microsoft.Extensions.DependencyInjection;
using PublicAddressBook.BusinessLayer.Implementations;
using PublicAddressBook.BusinessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace PublicAddressBook.BusinessLayer
{
    public static class ServiceCollectionExtensions
    {
        public static void RegisterBusinessServices(this IServiceCollection services)
        {
            services.AddTransient<IContactService, ContactService>();
        }
    }
}
