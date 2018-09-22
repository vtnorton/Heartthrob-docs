using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Heartthrob.Entities
{
    /// <summary>
    /// The customer demographic.
    /// </summary>
    [Table("CustomerCustomerDemo")]
    public partial class CustomerDemographic
    {
        /// <summary>
        /// Gets or sets the customer id.
        /// </summary>
        [Key]
        [Required]
        [StringLength(5, MinimumLength = 5)]
        public string CustomerID { get; set; }

        /// <summary>
        /// Gets or sets the demographic id.
        /// </summary>
        [Required]
        [StringLength(10, MinimumLength = 10)]
        public string DemographicID { get; set; }

        /// <summary>
        /// Gets or sets the customer.
        /// </summary>
        public virtual Customer Customer { get; set; }

        /// <summary>
        /// Gets or sets the demographic.
        /// </summary>
        public virtual Demographic Demographic { get; set; }
    }
}
