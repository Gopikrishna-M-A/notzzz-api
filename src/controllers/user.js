import User from '../models/user.js'
import Branch from '../models/branch.js'
import Module from "../models/module.js";
import Semester from '../models/semester.js'
import Subject from '../models/subject.js'

// Controller to get a specific user by ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to get a specific user by email
export const getUserByEmail = async (req, res) => {
  try {
    const user = await User.find({email:req.params.id});
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



// Controller to get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get all users
export const getAllCreators = async (req, res) => {
  try {
    const creators = await User.find({ creator: true });
    res.status(200).json(creators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to add a new user
export const addUser = async (req, res) => {
  const { name, email, image, oAuthId } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    // If the user already exists, return a conflict status
    return res.status(200).json({ message: 'User with this email already exists', user: existingUser });
  }
  const newUser = new User({ name, email, image, oAuthId });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Controller to delete a user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndRemove(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  try {
    const result = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getInfo = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find all modules associated with the user
    const userModules = await Module.find({ user: userId })
    .populate('semester') // Populate the semester field
    .populate('branch') // Populate the branch field
    .populate('subject'); // Populate the subject field


    const cascaderOptions = [];

    // Iterate through userModules to organize data by branch, semester, subject, and module
    userModules.forEach((module) => {
      const branchName = module.branch.name; // Assuming there is a 'name' field in the Branch model
      const semesterNumber = module.semester.name; // Assuming there is a 'number' field in the Semester model
      const subjectName = module.subject.name; // Assuming there is a 'name' field in the Subject model
      const moduleName = `Module ${module.module}`;

      // Find or create the branch option
      let branchOption = cascaderOptions.find((option) => option.label === branchName);
      if (!branchOption) {
        branchOption = { label: branchName, value: branchName, children: [] };
        cascaderOptions.push(branchOption);
      }

      // Find or create the semester option within the branch
      let semesterOption = branchOption.children.find((option) => option.value === semesterNumber);
      if (!semesterOption) {
        semesterOption = { label: `Sem ${semesterNumber}`, value: semesterNumber, children: [] };
        branchOption.children.push(semesterOption);
      }

      // Find or create the subject option within the semester
      let subjectOption = semesterOption.children.find((option) => option.label === subjectName);
      if (!subjectOption) {
        subjectOption = { label: subjectName, value: subjectName, children: [] };
        semesterOption.children.push(subjectOption);
      }

      // Add the module option within the subject
      subjectOption.children.push({
        label: moduleName,
        value: module.pdfPath, // Assuming you want to use pdfPath as the value
      });
    });

    return res.status(200).json({ dataByBranch: cascaderOptions });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




export const addRating = async (req, res) => {
  const { userId } = req.params;
  const { rating } = req.body;
  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the new rating to the ratings array
    user.ratings.push(rating);

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: 'Rating added successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const addDownloads = async (req, res) => {
  const { userId } = req.params;
  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the downloads field
    user.downloads += 1;

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: 'Downloads added successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


