import Semester from '../models/semester.js'


export const getSemester = async (req, res) => {
    const moduleId = req.params.id;
    try {
      const semester = await Semester.findById(moduleId);
  
      if (!semester) {
        return res.status(404).json({ message: "module not found" });
      }
  
      res.status(200).json(semester);
    } catch (error) {
      console.error('Error fetching module by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}   


export const getAllSemesters = async (req, res) => {
  try {
    const semester = await Semester.find({});

    if (!semester) {
      return res.status(404).json({ message: "semester not found" });
    }

    res.status(200).json(semester);
  } catch (error) {
    console.error('Error fetching semester by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const  addSemester = async (req, res) => {
    try {
        const data = req.body

        const newSemester = new Semester(data)
        const savedSemester = await newSemester.save();
        res.status(201).json(savedSemester);
      } catch (error) {
        console.error('Error adding semester:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}   


export const deleteSemester = async (req, res) => {
    const semesterId = req.params.id;
    try {
      // Find the question by its ID and delete it
      const deletedSemester = await Semester.findByIdAndDelete(semesterId);
  
      if (!deletedSemester) {
        return res.status(404).json({ message: "Semester not found" });
      }
  
      res.status(200).json({ message: "Semester deleted successfully" });
    } catch (error) {
      console.error('Error deleting semester:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}   



export const updateSemester = async (req, res) => {
    try {
      const semesterId = req.params.id;
      const updates = req.body;
      // Find the question by its ID and update the specified fields
      const updatedSemester = await Semester.findByIdAndUpdate(semesterId, updates, { new: true });
  
      if (!updatedSemester) {
        return res.status(404).json({ message: "Semester not found" });
      }
      res.status(200).json(updatedSemester);
    } catch (error) {
      console.error('Error updating semester:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}   

