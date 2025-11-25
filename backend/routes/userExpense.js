import express from "express";
import Expense from "../models/Expense.js";
import { AuthMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

const getWeekRange = (date) => {
  const newDate = new Date(date);
  const newDay = newDate.getDay();

  const diff = (newDay === 0 ? -6 : 1) - newDay;

  const start = new Date(newDate);
  start.setDate(newDate.getDate() + diff);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 7);

  return { start, end };
};

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
    res.json({ msg: "Expenses created successfully" });
  } catch {
    res.json({ msg: "Error in registering expenses" });
  }
});

router.get("/getExpenses", AuthMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json({ expenses });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Error getting expenses" });
  }
});

router.get("/details/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const expense = await Expense.findById(id);
    res.status(201).json({ expense });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Error getting details" });
  }
});

router.patch("/edit/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(201).json({ updatedExpense });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Error updating expense" });
  }
});

router.delete("/delete/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ msg: "Expense deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error deleting expense" });
  }
});

router.get("/filter/month", async (req, res) => {
  const { month, year } = req.query;

  try {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const results = await Expense.find({ date: { $gte: start, $lt: end } });
    res.status(200).json({ results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error filtering by month" });
  }
});

router.get("/filter/week", async (req, res) => {
  const { date } = req.query;

  try {
    const { start, end } = getWeekRange(date);

    const results = await Expense.find({ date: { $gte: start, $lt: end } });

    res.status(200).json({ results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error filtering by week" });
  }
});

export default router;
