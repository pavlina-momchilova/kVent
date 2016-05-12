namespace kVent.Services.Logic.Contracts
{
    using System;

    using kVent.Services.Common;

    public interface IObjectFactory : IService
    {
        T GetInstance<T>();

        object GetInstance(Type type);

        T TryGetInstance<T>();

        object TryGetInstance(Type type);
    }
}
