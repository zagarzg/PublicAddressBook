using PublicAddressBook.DomainLayer.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace PublicAddressBook.DomainLayer.Helpers
{
    public class ContactParameters : PaginationQueryParams
    {
        public string SearchString { get; set; }

        public string OrderBy { get; set; }

        public SortDirection? SortDirection { get; set; }
    }
}
