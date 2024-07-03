import User from "../model/user.model.js";

export const test = (req, res)=>{
    res.json({
        message:"API is working fine",
    });
};


export const signup = async(req , res)=>{
    const newUser = new User(req.body);
    try {
       await newUser.save();
       res.status(201).json({message : "user created successfully " , newUser});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "User Account already exist!!"});
    }
}

export const signin = async (req, res) => {
    const { username, password, email  } = req.body;

    let userfind;
    if (username) {
        userfind = await User.findOne({ username });
    } else if (email) {
        userfind = await User.findOne({ email });
    }

    if (!userfind) return res.status(404).send({ message: "User not found" });

    if (password === userfind.password) {
        req.session.user = userfind;
        return res.status(200).send({ message: "User found and signed in successfully", user: userfind });
    } else {
        return res.status(400).send({ error: "Invalid credentials" });
    }
};

export const update = async (req, res) => {
    const { username, password, email, newpass } = req.body;

    let userfind;
    if (username) {
        userfind = await User.findOne({ username });
    } else if (email) {
        userfind = await User.findOne({ email });
    }

    if (!userfind) return res.status(404).send({ message: "User not found" });

    if (password === userfind.password) {
        userfind.password = newpass;
       

        await userfind.save();

        return res.status(200).send({ message: "Updation successful", user: userfind });
    } else {
        return res.status(400).send({ error: "Invalid credentials" });
    }
};

export const deleteUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        let userfind;
        if (username) {
            userfind = await User.findOne({ username });
        } else if (email) {
            userfind = await User.findOne({ email });
        }

        if (!userfind) return res.status(404).send({ message: "User not found" });

        if (password === userfind.password) {
            await User.findByIdAndDelete(userfind._id);
            return res.status(200).send({ message: "Deleted successfully" });
        } else {
            return res.status(400).send({ error: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).send({ error: "An error occurred while deleting the user" });
    }
};

export const findAll = async(req , res)=>{
    const usersList = await User.find();
    if(!usersList) return res.staus(404).send({error:"Users not found"});
    return res.status(200).send(usersList);
 }
