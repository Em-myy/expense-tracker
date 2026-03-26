import express from "express";
import Expense from "../models/Expense.js";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
import axios from "axios";
import User from "../models/User.js";

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

/* Mono routes */

router.post("/exchangeCode", AuthMiddleware, async (req, res) => {
  const { code } = req.body;
  const userId = req.user._id;

  try {
    const response = await axios.post(
      "https://api.withmono.com/v2/accounts/auth",
      { code },
      {
        headers: {
          "mono-sec-key": process.env.MONO_SECRET_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    const accountId = response.data.data.id;

    const updatedUser = await User.findByIdAndUpdate(userId, {
      monoAccountId: accountId,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to link bank account" });
  }
});

router.get("/bankStatus", AuthMiddleware, async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    res.status(200).json({ linked: !!user.monoAccountId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to check bank status" });
  }
});

router.get("/getTransactions", AuthMiddleware, async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);

    const accountId = user.monoAccountId;

    if (!accountId) {
      return res.status(400).json({ error: "No bank account linked" });
    }

    const response = await axios.get(
      `https://api.withmono.com/v2/accounts/${accountId}/transactions`,
      {
        headers: {
          "mono-sec-key": process.env.MONO_SECRET_KEY,
          "Content-Type": "application/json",
        },
        params: {
          limit: 100,
          page: 1,
        },
      },
    );

    res.status(200).json({ success: true, transactions: response.data.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// New route for the graph that will combine the normal expenses and the bank transactions
router.post("/importTransactions", AuthMiddleware, async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    const accountId = user.monoAccountId;

    if (!accountId) {
      return res.status(400).json({ error: "No account linked" });
    }

    const response = await axios.get(
      `https://api.withmono.com/v2/accounts/${accountId}/transactions`,
      {
        headers: {
          "mono-sec-key": process.env.MONO_SECRET_KEY,
          "Content-Type": "application/json",
        },
        params: {
          limit: 100,
          page: 1,
        },
      },
    );

    const transactions = response.data.data;

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: "No transactions found" });
    }

    const expenses = transactions.map((tx) => ({
      userId,
      title: tx.narration,
      amount: tx.amount / 100,
      category: tx.type === "credit" ? "income" : "expense",
      date: new Date(tx.date),
      source: "mono",
    }));

    const inserted = [];
    for (const expense of expenses) {
      const existingExpense = await Expense.findOne({
        userId,
        title: expense.title,
        amount: expense.amount,
        date: expense.date,
      });

      if (!existingExpense) {
        await Expense.create(expense);
        inserted.push(expense);
      }
    }

    return res.status(200).json({ success: true, imported: inserted.length });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to import transactions" });
  }
});

//Remove the bank transactions from the expenses
router.delete("/removeImported", AuthMiddleware, async (req, res) => {
  const userId = req.user._id;

  try {
    const result = await Expense.deleteMany({ userId, source: "mono" });

    res.status(200).json({ success: true, removed: result.deletedCount() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete transactions" });
  }
});

export default router;
