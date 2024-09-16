import asyncHandler from "express-async-handler";

import prisma from "../../prisma/index.js";

const fetchPastSevenSalesHistory = asyncHandler(async (req, res) => {
  const today = new Date(); // Current date
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7); // 7 days ago from today

  const manufacturerId = req.user.manufacturerId; // Manufacturer ID passed from the request

  try {
    // Fetch the sales history
    const salesHistory = await prisma.sale.findMany({
      where: {
        sale_date: {
          gte: sevenDaysAgo, // Sale date greater than or equal to 7 days ago
          lte: today, // Sale date less than or equal to today
        },
        product: {
          manufacturer_id: manufacturerId, // Filter by the manufacturer ID
        },
      },
      select: {
        sale_date: true,
        quantity: true,
      },
      orderBy: {
        sale_date: "desc", // Order by sale date, most recent first
      },
    });

    if (salesHistory.length === 0) {
      return res
        .status(404)
        .json({ message: "No sales found for the past 7 days" });
    }

    // Group sales by day and sum the quantities
    const dailySales = {};

    salesHistory.forEach((sale) => {
      const saleDay = sale.sale_date.toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (!dailySales[saleDay]) {
        dailySales[saleDay] = 0;
      }
      dailySales[saleDay] += sale.quantity;
    });

    // Map the data to the required format
    const salesData = Object.keys(dailySales).map((day) => ({
      x: day,
      y: dailySales[day],
    }));

    // Return the response in the required format
    res.status(200).json({
      id: "revenue",
      color: "hsl(205, 70%, 50%)",
      data: salesData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching sales history",
      error: error.message,
    });
  }
});

const fetchMonthlySalesHistory = asyncHandler(async (req, res) => {
  const today = new Date(); // Current date
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1); // One year ago from today

  const manufacturerId = req.user.manufacturerId; // Manufacturer ID passed from the request

  try {
    // Fetch the sales history
    const salesHistory = await prisma.sale.findMany({
      where: {
        sale_date: {
          gte: oneYearAgo, // Sale date greater than or equal to one year ago
          lte: today, // Sale date less than or equal to today
        },
        product: {
          manufacturer_id: manufacturerId, // Filter by the manufacturer ID
        },
      },
      select: {
        sale_date: true,
        quantity: true,
      },
      orderBy: {
        sale_date: "desc", // Order by sale date, most recent first
      },
    });

    if (salesHistory.length === 0) {
      return res
        .status(404)
        .json({ message: "No sales found for the past year" });
    }

    // Group sales by month and sum the quantities
    const monthlySales = {};

    salesHistory.forEach((sale) => {
      const saleMonth = sale.sale_date.toLocaleDateString("en-US", {
        month: "long",
      });
      if (!monthlySales[saleMonth]) {
        monthlySales[saleMonth] = 0;
      }
      monthlySales[saleMonth] += sale.quantity;
    });

    // Map the data to the required format
    const salesData = Object.keys(monthlySales).map((month) => ({
      x: month,
      y: monthlySales[month],
    }));

    // Return the response in the required format
    res.status(200).json({
      id: "revenue",
      color: "hsl(205, 70%, 50%)",
      data: salesData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching sales history",
      error: error.message,
    });
  }
});

export { fetchPastSevenSalesHistory, fetchMonthlySalesHistory };
