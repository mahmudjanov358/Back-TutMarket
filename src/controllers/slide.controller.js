// <==========> <==========> <==========>
// Imports Point
// <==========> <==========> <==========>
const { Slide } = require("../models/main");

// <==========> <==========> <==========>
// Create Slide Point
// <==========> <==========> <==========>
exports.createSlide = async (req, res) => {
  try {
    const slide = await Slide.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Slide qo'shildi!",
    });
  } catch (error) {
    console.error("createSlide error", error);
    return res.status(500).json({ message: "createSlide error" });
  }
};

// <==========> <==========> <==========>
// Get Slides Point
// <==========> <==========> <==========>
exports.getSlides = async (req, res) => {
  try {
    const slides = await Slide.findAll();
    return res
      .status(200)
      .json({ success: true, message: "Slides ro'yxati: ", slides });
  } catch (error) {
    console.error("getSlides error", error);
    return res.status(500).json({ message: "getSlides error" });
  }
};

// <==========> <==========> <==========>
// Get Slide By Pk Point
// <==========> <==========> <==========>
exports.getSlideByPk = async (req, res) => {
  try {
    const slide = await Slide.findByPk(req.params.id);
    if (!slide) {
      return res
        .status(404)
        .json({ success: false, message: "Slide topilmadi!" });
    }
    return res.status(200).json({ success: true, message: "Slide: ", slide });
  } catch (error) {
    console.error("getSlideByPk error", error);
    return res.status(500).json({ message: "getSlideByPk error" });
  }
};

// <==========> <==========> <==========>
// Update Slide Point
// <==========> <==========> <==========>
exports.updateSlide = async (req, res) => {
  try {
    const slide = await Slide.findByPk(req.params.id);
    if (!slide) {
      return res
        .status(404)
        .json({ success: false, message: "Slide topilmadi!" });
    }
    await slide.update(req.body);
    return res
      .status(200)
      .json({ success: true, message: "Slide yangilandi!" });
  } catch (error) {
    console.error("updateSlide error", error);
    return res.status(500).json({ message: "updateSlide error" });
  }
};

// <==========> <==========> <==========>
// Delete Slide Point
// <==========> <==========> <==========>
exports.deleteSlide = async (req, res) => {
  try {
    const slide = await Slide.findByPk(req.params.id);
    if (!slide) {
      return res
        .status(404)
        .json({ success: false, message: "Slide topilmadi!" });
    }
    await slide.destroy();
    return res
      .status(200)
      .json({ success: true, message: "Slide o'chirildi!" });
  } catch (error) {
    console.error("deleteSlide error", error);
    return res.status(500).json({ message: "deleteSlide error" });
  }
};
