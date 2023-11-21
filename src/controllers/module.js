import express from "express";
import Module from "../models/module.js";
import { fileURLToPath } from "url";
import path from "path";
import { log } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getModule = async (req, res) => {
  const moduleId = req.params.id;
  try {
    const module = await Module.findById(moduleId);

    if (!module) {
      return res.status(404).json({ message: "module not found" });
    }

    res.status(200).json(module);
  } catch (error) {
    console.error("Error fetching module by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllModules = async (req, res) => {
  try {
    const module = await Module.find({});

    if (!module) {
      return res.status(404).json({ message: "module not found" });
    }

    res.status(200).json(module);
  } catch (error) {
    console.error("Error fetching module by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getModuleBysubjectId = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const module = await Module.find({ subject: subjectId });

    if (!module) {
      return res.status(404).json({ message: "module not found" });
    }

    res.status(200).json(module);
  } catch (error) {
    console.error("Error fetching module by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addModule = async (req, res) => {
  log(req.body);
  try {
    const { module, subject, semester, branch, user  } = req.body;
    
    let pdfPath = req.file.filename;

    const dataToSave = {
      semester,
      subject,
      pdfPath,
      branch,
      module,
      user
    };

    const newModule = new Module(dataToSave);
    const savedModule = await newModule.save();
    res.status(201).json({ success:'Module added successfully', subject:savedModule });
  } catch (error) {
    console.error("Error adding module:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteModule = async (req, res) => {
  const moduleId = req.params.id;
  try {
    // Find the question by its ID and delete it
    const deletedModule = await Module.findByIdAndDelete(moduleId);

    if (!deletedModule) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.status(200).json({ message: "Module deleted successfully" });
  } catch (error) {
    console.error("Error deleting module:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateModule = async (req, res) => {
  const moduleId = req.params.id;
  const updates = req.body;
  try {
    // Find the question by its ID and update the specified fields
    const updatedModule = await Module.findByIdAndUpdate(moduleId, updates, {
      new: true,
    });

    if (!updatedModule) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.status(200).json(updatedModule);
  } catch (error) {
    console.error("Error updating module:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPdf = async (req, res) => {
  const uploadPath = path.resolve(__dirname, "..", "..", "uploads");
  res.download(uploadPath + "/" + req.params.path);
};
