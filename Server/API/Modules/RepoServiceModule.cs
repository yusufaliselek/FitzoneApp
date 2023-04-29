using Autofac;
using Repository.UnitOfWorks;
using Server.Core.Repositories;
using Server.Core.UnitOfWork;
using Server.Data.Repository;
using Server.Data;
using Service.Mapping;
using System.Reflection;
using Server.Service.Services;
using Server.Core.Services;
using Module = Autofac.Module;
using Service.Services;

namespace API.Modules
{
    public class RepoServiceModule : Module
    {

        protected override void Load(ContainerBuilder builder)
        {

            builder.RegisterGeneric(typeof(GenericRepository<>)).As(typeof(IGenericRepository<>)).InstancePerLifetimeScope();
            builder.RegisterGeneric(typeof(GenericService<>)).As(typeof(IGenericService<>)).InstancePerLifetimeScope();


            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();

            var apiAssembly = Assembly.GetExecutingAssembly();
            var repoAssembly = Assembly.GetAssembly(typeof(AppDbContext));
            var serviceAssembly = Assembly.GetAssembly(typeof(MapProfile));

            builder.RegisterAssemblyTypes(apiAssembly, repoAssembly, serviceAssembly).Where(x => x.Name.EndsWith("Repository")).AsImplementedInterfaces().InstancePerLifetimeScope();


            builder.RegisterAssemblyTypes(apiAssembly, repoAssembly, serviceAssembly).Where(x => x.Name.EndsWith("Service")).AsImplementedInterfaces().InstancePerLifetimeScope();


       //     builder.RegisterType<ProductServiceWithCaching>().As<IProductService>();

        }
    }
}
