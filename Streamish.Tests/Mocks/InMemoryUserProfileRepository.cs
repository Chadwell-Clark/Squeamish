using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Streamish.Models;
using Streamish.Repositories;


namespace Streamish.Tests.Mocks
{
    class InMemoryUserProfileRepository : IUserProfileRepository

    {
        private readonly List<UserProfile> _data;
        public List<UserProfile> InternalData
        {
            get
            {
                return _data;
            }
        }

        public InMemoryUserProfileRepository(List<UserProfile> startingData)
        {
            _data = startingData;
}

        public void Add(UserProfile userProfile)
        {
            var lastUserProfile = _data.Last();
            userProfile.Id = lastUserProfile.Id + 1;
            _data.Add(userProfile);
        }

        public void Delete(int id)
        {
            var userProfileToDelete = _data.FirstOrDefault(u => u.Id == id);
            if (userProfileToDelete == null)
            {
                return;
            }
        }

        public List<UserProfile> GetAll()
        {
            return _data;
        }

        public UserProfile GetById(int id)
        {
            return _data.FirstOrDefault(u => u.Id == id);
        }

        public UserProfile GetUserByIdWIthVideos(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(UserProfile userProfile)
        {
            var currentUserProfile = _data.FirstOrDefault(u => u.Id == userProfile.Id);
            if (currentUserProfile == null)
            {
                return;
            }
            currentUserProfile.Name = userProfile.Name;
            currentUserProfile.Email = userProfile.Email;
            currentUserProfile.DateCreated = userProfile.DateCreated;
            currentUserProfile.ImageUrl = userProfile.ImageUrl;
        }
    }

}
