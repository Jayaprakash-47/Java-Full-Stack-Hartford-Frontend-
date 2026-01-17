# Purchase Order & Invoice Management System (JavaScript)

This project is a simple JavaScript-based simulation of a **Purchase Order (PO) and Invoice Management System** designed for a corporate training organization.

It demonstrates how:

- Purchase Orders are generated when a training program is confirmed  
- Invoices are created only after the training is completed  
- Due dates are calculated automatically  
- Overdue invoices are detected  
- Email alerts are triggered for overdue payments  

The system is implemented using plain JavaScript and runs in the browser console or Node.js.

---

## 🚀 Features

- Random PO / Invoice number generator (e.g., `ABC123`)
- Create Purchase Orders based on:
  - Trainer details  
  - Training details  
  - Payment type (Hourly / Daily / Monthly)  
  - Rate and duration  
- Automatic total amount calculation  
- Invoice generation only after training end date  
- Due date set to 30 days from invoice date  
- Overdue invoice detection  
- Simulated email alert for overdue invoices  

---

## 🧩 Core Functions

| Function Name        | Description |
|----------------------|-------------|
| `generateNumber()`   | Generates a random alphanumeric code for PO/Invoice |
| `createPO()`         | Creates a Purchase Order object |
| `generateInvoice()`  | Generates an Invoice after training completion |
| `checkOverdue()`     | Marks invoice as `OVERDUE` if due date has passed |
| `sendEmailAlert()`   | Simulates sending an email for overdue invoices |

---

## 📝 Example Flow

1. Define trainer and training details  
2. Create a Purchase Order  
3. Generate an Invoice after training end date  
4. Modify due date to simulate delay  
5. Check and mark invoice as overdue  

```js
let po = createPO(trainer, training, "Daily", 5000, 10);
let invoice = generateInvoice(po);
checkOverdue(invoice);


## 🖥 Sample Console Output

```text
Purchase Order: {
  poNumber: 'DHB285',
  trainer: {
    name: 'Ravi Kumar',
    email: 'ravi@trainer.com',
    experience: '8 years'
  },
  training: {
    course: 'Java Full Stack',
    client: 'The Hartford',
    startDate: '2025-12-01',
    endDate: '2025-12-10'
  },
  paymentType: 'Daily',
  rate: 5000,
  duration: 10,
  totalAmount: 50000
}

Invoice: {
  invoiceNumber: 'MJL758',
  poNumber: 'DHB285',
  trainerName: 'Ravi Kumar',
  courseName: 'Java Full Stack',
  totalAmount: 50000,
  invoiceDate: 2026-01-12T12:20:20.272Z,
  dueDate: 2026-02-11T12:20:20.272Z,
  status: 'UNPAID'
}

📧 Email Sent to Accounts Team:
Invoice MJL758 is OVERDUE for PO DHB285.

Final Invoice Status: OVERDUE
