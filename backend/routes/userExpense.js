import express from "express";
import Expense from "../models/Expense.js";
import { AuthMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", AuthMiddleware, async (req, res) => {
  const { title, amount, category } = req.body;

  try {
    const newExpenses = new Expense({
      userId: req.user._id,
      title,
      amount,
      category,
    });
    await newExpenses.save();
    return res.json({ msg: "Expenses created successfully" });
  } catch {
    return res.json({ msg: "Error in registering expenses" });
  }
});

router.get("/getExpenses", AuthMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    return res.json({ expenses });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "Error getting expenses" });
  }
});

router.get("/details/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const expense = await Expense.findById(id);
    return res.status(201).json({ expense });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "Error getting details" });
  }
});

router.patch("/edit/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
    );

    return res.status(201).json({ updatedExpense });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "Error updating expense" });
  }
});

router.delete("/delete/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    await Expense.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Expense deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "Error deleting expense" });
  }
});

router.get("/filter", async (req, res) => {
  const { year, month, date, category } = req.query;

  try {
    const query = {};

    if (category) {
      query.category = category;
    }

    if (year && month) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 1);

      query.date = { $gte: start, $lte: end };
    }

    if (date && !month) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      query.date = { $gte: start, $lte: end };
    }

    const results = await Expense.find(query).sort({ date: -1 });

    if (results.length === 0) {
      return res
        .status(404)
        .json({ msg: "No transaction found for the selected filter" });
    }

    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({ msg: "Error filtering expenses" });
  }
});

router.get("/summary", async (req, res) => {
  const { category } = req.query;

  try {
    const summary = await Expense.find({ category });

    return res.status(200).json({
      summary,
    });
  } catch (error) {
    return res.status(404).json({ msg: "Error getting summary" });
  }
});

export default router;
