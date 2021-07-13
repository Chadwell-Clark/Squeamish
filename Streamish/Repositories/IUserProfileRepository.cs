using Streamish.Models;
using System.Collections.Generic;

namespace Streamish.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void Delete(int id);
        List<UserProfile> GetAll();
        UserProfile GetById(int id);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetUserByIdWIthVideos(int id);
        void Update(UserProfile userProfile);
    }
}