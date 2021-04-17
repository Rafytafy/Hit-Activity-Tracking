import Edit from '../components/profileComponents/Edit';
import Profile from '../components/profileComponents/Profile';
import ProfileInfo from '../components/profileComponents/ProfileInfo';

test("Edit function exists", () => {
    expect(Edit).toBeDefined();
});
  
test("Profile Function exists", () => {
    expect(Profile).toBeDefined();
});

test("ProfileInfo function exists", () => {
    expect(ProfileInfo).toBeDefined();
});

test("Profile is truthy", () => {
    expect(Profile).toBeTruthy();
})
