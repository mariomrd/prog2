import { users } from "../../mockData";
import { IUser, IUserWithoutPasswordAndRole } from "./usersInterfaces";



const usersServices = {
    userById: (id: number): IUser | undefined => {
        const user = users.find(element => {
            element.id = id;
        });
        return user;
    },

    changeUserData: (userToChangeData: IUser ): Boolean => {
        const {id, firstName, lastName, email, password} = userToChangeData;
        const user = usersServices.userById(id);
        if (user && firstName) user.firstName = firstName;
        if (user && lastName) user.lastName = lastName;
        if (user && email) user.email = email;
        if (user && password) user.password = password;

        return true;
    },

    deleteUser: (id: number): Boolean => {
        const index = users.findIndex(element => element.id === id);
        if(index === -1) return false;
        users.splice(index, 1);
        return true;
    },
    findUserByEmail: (email: string): IUser | undefined => {
        const user: IUser | undefined = users.find((element) => element.email === email);
        return user;
      },

}

export default usersServices;