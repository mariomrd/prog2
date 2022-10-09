import { users } from "../../mockData";
import { IUser, IUserWithPassword } from "./users_interfaces";



const usersServices = {
    userById: (id: number): IUserWithPassword | undefined => {
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
    }

}

export default usersServices;