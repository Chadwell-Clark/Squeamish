using Streamish.Controllers;
using Streamish.Models;

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using Streamish.Tests.Mocks;

namespace Streamish.Tests
{
    public class UserProfileControllerTests
    {
        //Get()
        [Fact]
        public void Get_Returns_All_UserProfiles()
        {
            var userProfileCount = 25;
            var userProfiles = CreateTestUserProfiles(userProfileCount);

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            var result = controller.Get();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualUserProfiles = Assert.IsType<List<UserProfile>>(okResult.Value);

            Assert.Equal(userProfileCount, actualUserProfiles.Count);
            Assert.Equal(userProfiles, actualUserProfiles);

        }
        //Get(int id)

        [Fact]
        public void Get_By_Id_Returns_UserProfile_With_Given_Id()
        {
            var testUserProfileId = 25;
            var userProfiles = CreateTestUserProfiles(5);
            userProfiles[0].Id = testUserProfileId;

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            var result = controller.Get(testUserProfileId);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualUserProfile = Assert.IsType<UserProfile>(okResult.Value);

           
            Assert.Equal(testUserProfileId, actualUserProfile.Id);

        }

        [Fact]
        public void Get_By_Id_Returns_NotFound_When_Given_Unknown_Id()
        {
            
            var userProfiles = new List<UserProfile>(); // Empty list of userProfiles
            

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            var result = controller.Get(1);

            Assert.IsType<NotFoundResult>(result);

        }

        //Post(UserProfile userProfile)
        [Fact]
        public void Post_Method_Adds_A_New_UserProfile()
        {
            // Arrange 
            var userProfileCount = 20;
            var userProfiles = CreateTestUserProfiles(userProfileCount);

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            // Act
            var newUserProfile = new UserProfile()
            {
                Name = "Name",
                Email = "Email",
                ImageUrl = "http://youtube.url?v=1234",
                DateCreated = DateTime.Today
               
            };

            controller.Post(newUserProfile);

            // Assert
            Assert.Equal(userProfileCount + 1, repo.InternalData.Count);
        }

        //Put(int id, UserProfile userProfile)
        [Fact]
        public void Put_Method_Updates_A_UserProfile()
        {
            // Arrange
            var testUserProfileId = 99;
            var userProfiles = CreateTestUserProfiles(5);
            userProfiles[0].Id = testUserProfileId; // Make sure we know the Id of one of the userProfiles

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            var userProfileToUpdate = new UserProfile()
            {
                Id = testUserProfileId,
                Name = "Updated!",
                Email = "Updated!",
                DateCreated = DateTime.Today,
                ImageUrl = "http://some.url",
            };

            // Act
            controller.Put(testUserProfileId, userProfileToUpdate);

            // Assert
            var userProfileFromDb = repo.InternalData.FirstOrDefault(p => p.Id == testUserProfileId);
            Assert.NotNull(userProfileFromDb);

            Assert.Equal(userProfileToUpdate.Name, userProfileFromDb.Name);
            Assert.Equal(userProfileToUpdate.Email, userProfileFromDb.Email);
     
            Assert.Equal(userProfileToUpdate.DateCreated, userProfileFromDb.DateCreated);
            Assert.Equal(userProfileToUpdate.ImageUrl, userProfileFromDb.ImageUrl);
        }

        [Fact]
        public void Put_Method_Returns_BadRequest_When_Ids_Do_Not_Match()
        {
            // Arrange
            var testUserProfileId = 99;
            var userProfiles = CreateTestUserProfiles(5);
            userProfiles[0].Id = testUserProfileId; // Make sure we know the Id of one of the userProfiles

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            var userProfileToUpdate = new UserProfile()
            {
                Id = testUserProfileId,
                Name = "Updated!",
                Email = "Updated!",
                DateCreated = DateTime.Today,
                ImageUrl = "http://some.url",
            };
            var someOtherUserProfileId = testUserProfileId + 1; // make sure they aren't the same

            // Act
            var result = controller.Put(someOtherUserProfileId, userProfileToUpdate);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }
        //Delete(int id)
        [Fact]
        public void Delete_Method_Removes_A_UserProfile()
        {
            // Arrange
            var testUserProfileId = 99;
            var userProfiles = CreateTestUserProfiles(5);
            userProfiles[0].Id = testUserProfileId; // Make sure we know the Id of one of the userProfiles

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            // Act
            controller.Delete(testUserProfileId);

            // Assert
            var userProfileFromDb = repo.InternalData.FirstOrDefault(u => u.Id == testUserProfileId);
            Assert.Null(userProfileFromDb);
        }

        private List<UserProfile> CreateTestUserProfiles(int count)
        {
            var userProfiles = new List<UserProfile>();
            for (var i = 1; i <= count; i++)
            {
                userProfiles.Add(new UserProfile()
                {
                    Id = i,
                    Email = $"Email@{i}",
                    Name = $"Name {i}",
                    ImageUrl = $"http://youtube.url/{i}?v=1234",
                    DateCreated = DateTime.Today.AddDays(-i)
                });
            }
            return userProfiles;
        }
    }
}

