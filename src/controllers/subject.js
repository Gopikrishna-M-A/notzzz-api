import Subject from '../models/subject.js'


export const getSubject = async (req, res) => {
    const subjectId = req.params.id;
    try {
      const subject = await Subject.findById(subjectId);
  
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
  
      res.status(200).json(subject);
    } catch (error) {
      console.error('Error fetching subject by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}   

export const getAllSubjects = async (req, res) => {
  try {
    const subject = await Subject.find({});

    if (!subject) {
      return res.status(404).json({ message: "subject not found" });
    }

    res.status(200).json(subject);
  } catch (error) {
    console.error('Error fetching subject by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSubjectBySemester = async (req, res) => {
  try {
    const { branch, semester } = req.params;
    const subject = await Subject.find({ branch, semester });

    if (!subject) {
      return res.status(404).json({ message: "subject not found" });
    }

    res.status(200).json(subject);
  } catch (error) {
    console.error('Error fetching subject by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const addSubject = async (req, res) => {
    try {
        const data = req.body
        console.log(data);
        const newSubject = new Subject(data)
        const savedSubject = await newSubject.save();
        res.status(201).json({ success: 'Subject added successfully', subject: savedSubject});
      } catch (error) {
        console.error('Error adding subject:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}   


export const deleteSubject = async (req, res) => {
    const subjectId = req.params.id;
    try {
      // Find the question by its ID and delete it
      const deletedSubject = await Subject.findByIdAndDelete(subjectId);
  
      if (!deletedSubject) {
        return res.status(404).json({ message: "Subject not found" });
      }
  
      res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
      console.error('Error deleting subject:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}   



export const updateSubject = async (req, res) => {
    const subjectId = req.params.id;
    const updates = req.body;
    try {
      // Find the question by its ID and update the specified fields
      const updatedSubject = await Subject.findByIdAndUpdate(subjectId, updates, { new: true });
  
      if (!updatedSubject) {
        return res.status(404).json({ message: "Subject not found" });
      }
  
      res.status(200).json(updatedSubject);
    } catch (error) {
      console.error('Error updating subject:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}   

