using AutoMapper;
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
        public static void ConfigureBussinessLayer(this IServiceCollection services)
        {
            services.AddTransient<IContactService, ContactService>();
        }

        public static void ConfigureAutomapper(this IServiceCollection services)
        {
            services.AddSingleton(provider =>
            {
                var config = new MapperConfiguration(c =>
                {
                    c.AddProfile<Mappings>();
                });

                return config.CreateMapper();
            });
        }
    }
}
