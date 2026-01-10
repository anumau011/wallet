import prisma from "../lib/prisma.js";


export async function getTransactionsByUserId(req, res) {
  try {
    const uid = parseInt(req.userId)

    if (isNaN(uid)) {
      return res.status(400).json({ message: "Invalid user ID" })
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: uid
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.status(200).json(transactions)
  } catch (error) {
    console.error("Error getting the transactions", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function createTransaction(req, res) {
  const { title, amount, category } = req.body;
  const userId = parseInt(req.userId)
  if (!title || !userId || !category || amount === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const transaction = await prisma.transaction.create({
      data: {
        title,
        amount,
        category,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.json(transaction);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error creating transaction");
  }
}

export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;
    const transactionId = parseInt(id);

    if (isNaN(transactionId)) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    const deletedTransaction = await prisma.transaction.delete({
      where: { id: transactionId },
    });

    res.status(200).json({
      message: "Transaction deleted successfully",
      data: deletedTransaction,
    });
  } catch (error) {
    console.error("Error deleting the transaction", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getSummaryByUserId(req, res) {
  try {
    const  userId  = req.userId
    const uid = parseInt(userId)

    if (isNaN(uid)) {
      return res.status(400).json({ message: "Invalid user ID" })
    }

    const [balanceResult, incomeResult, expensesResult] =
      await Promise.all([
        prisma.transaction.aggregate({
          where: { userId: uid },
          _sum: { amount: true }
        }),
        prisma.transaction.aggregate({
          where: {
            userId: uid,
            amount: { gt: 0 }
          },
          _sum: { amount: true }
        }),
        prisma.transaction.aggregate({
          where: {
            userId: uid,
            amount: { lt: 0 }
          },
          _sum: { amount: true }
        })
      ])

    res.status(200).json({
      balance: balanceResult._sum.amount ?? 0,
      income: incomeResult._sum.amount ?? 0,
      expenses: expensesResult._sum.amount ?? 0
    })
  } catch (error) {
    console.error("Error getting the summary", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
