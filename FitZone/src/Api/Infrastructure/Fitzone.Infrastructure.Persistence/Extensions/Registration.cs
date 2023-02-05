using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fitzone.Api.Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Fitzone.Api.Infrastructure.Persistence.Extensions
{
    public static class Registration
    {
        public static IServiceCollection AddInfrastructureRegistration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<FitzoneDbContext>(conf =>
            {
                var ConnString = configuration[key: "DBContext"].ToString();
                conf.UseSqlServer(ConnString, opt =>
                {
                    opt.EnableRetryOnFailure();
                });
            });
            return services;
        }
    }
}
