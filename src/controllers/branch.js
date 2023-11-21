import Branch from '../models/branch.js'


export const getBranch = async (req, res) => {
    const moduleId = req.params.id;
    try {
      const branch = await Branch.findById(moduleId);
  
      if (!branch) {
        return res.status(404).json({ message: "branch not found" });
      }
  
      res.status(200).json(branch);
    } catch (error) {
      console.error('Error fetching branch by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}   


export const getAllBranch = async (req, res) => {
  try {
    const branch = await Branch.find({});

    if (!branch) {
      return res.status(404).json({ message: "branch not found" });
    }

    res.status(200).json(branch);
  } catch (error) {
    console.error('Error fetching branch by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const  addBranch = async (req, res) => {
    try {
        const data = req.body

        const newBranch = new Branch(data)
        const savedBranch = await newBranch.save();
        res.status(201).json(savedBranch);
      } catch (error) {
        console.error('Error adding branch:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}   


export const deleteBranch = async (req, res) => {
    const branchId = req.params.id;
    try {
      // Find the question by its ID and delete it
      const deletedBranch = await Branch.findByIdAndDelete(branchId);
  
      if (!deletedBranch) {
        return res.status(404).json({ message: "Branch not found" });
      }
  
      res.status(200).json({ message: "Branch deleted successfully" });
    } catch (error) {
      console.error('Error deleting branch:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}   



export const updateBranch = async (req, res) => {
    try {
      const branchId = req.params.id;
      const updates = req.body;
      // Find the question by its ID and update the specified fields
      const updatedBranch = await Branch.findByIdAndUpdate(branchId, updates, { new: true });
  
      if (!updatedBranch) {
        return res.status(404).json({ message: "Branch not found" });
      }
      res.status(200).json(updatedBranch);
    } catch (error) {
      console.error('Error updating branch:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}   

