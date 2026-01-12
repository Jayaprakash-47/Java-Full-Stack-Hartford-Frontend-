// Utility: Generate PO / Invoice number (ABC123)
function generateNumber() {
  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 3; i++) {
    code += letters[Math.floor(Math.random() * 26)];
  }
  let digits = Math.floor(100 + Math.random() * 900);
  return code + digits;
}

// Create Purchase Order
function createPO(trainer, training, paymentType, rate, duration) {
  let total = 0;

  if (paymentType === "Hourly") {
    total = rate * duration; // hours
  } else if (paymentType === "Daily") {
    total = rate * duration; // days
  } else if (paymentType === "Monthly") {
    total = rate * duration; // months
  }

  return {
    poNumber: generateNumber(),
    trainer,
    training,
    paymentType,
    rate,
    duration,
    totalAmount: total
  };
}

// Generate Invoice after training end date
function generateInvoice(po) {
  let today = new Date();
  let endDate = new Date(po.training.endDate);

  if (today < endDate) {
    console.log("Training not completed. Invoice cannot be generated.");
    return null;
  }

  let dueDate = new Date(today);
  dueDate.setDate(dueDate.getDate() + 30);

  return {
    invoiceNumber: generateNumber(),
    poNumber: po.poNumber,
    trainerName: po.trainer.name,
    courseName: po.training.course,
    totalAmount: po.totalAmount,
    invoiceDate: today,
    dueDate: dueDate,
    status: "UNPAID"
  };
}

// Check overdue
function checkOverdue(invoice) {
  let today = new Date();

  if (invoice.status === "UNPAID" && today > invoice.dueDate) {
    invoice.status = "OVERDUE";
    sendEmailAlert(invoice);
  }
}

// Simulated Email
function sendEmailAlert(invoice) {
  console.log("📧 Email Sent to Accounts Team:");
  console.log(
    `Invoice ${invoice.invoiceNumber} is OVERDUE for PO ${invoice.poNumber}.`
  );
}

// ------------------- DEMO -------------------

// Trainer & Training details
let trainer = {
  name: "Ravi Kumar",
  email: "ravi@trainer.com",
  experience: "8 years"
};

let training = {
  course: "Java Full Stack",
  client: "The Hartford",
  startDate: "2025-12-01",
  endDate: "2025-12-10"
};

// Create PO
let po = createPO(trainer, training, "Daily", 5000, 10);
console.log("Purchase Order:", po);

// Simulate date after training end
let fakeToday = new Date("2025-12-15");

// Generate Invoice
let invoice = generateInvoice(po);
console.log("Invoice:", invoice);

// Simulate overdue
invoice.dueDate = new Date("2025-12-20");
checkOverdue(invoice);
console.log("Final Invoice Status:", invoice.status);
