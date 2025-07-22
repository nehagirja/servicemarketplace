import PeopleModel from "../models/people.js";

export const save = (newUser) => {
    const user = new PeopleModel(newUser);
    return user.save();
}

export const getAllUsers = async() => {
    const allUsers = await PeopleModel.find();
    console.log("ALL Peopele Model : " + JSON.stringify(getAllUsers))
    return allUsers;
}