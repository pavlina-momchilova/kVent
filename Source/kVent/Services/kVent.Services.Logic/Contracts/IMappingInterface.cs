namespace kVent.Services.Logic.Contracts
{
    using kVent.Services.Common;

    public interface IMappingService : IService
    {
        T Map<T>(object source);

        TDestination Map<TSource, TDestination>(TSource source, TDestination destination);
    }
}
