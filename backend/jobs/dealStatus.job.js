import dealModel from "../models/deal.model.js";

// simple interval job (runs every 30 seconds for demo)
const updateDealStatusJob = async () => {
  try {
    const deals = await dealModel.find();

    for (let deal of deals) {
      let oldStatus = deal.status;

      if (deal.currentRaisedAmount >= deal.targetAmount) {
        deal.status = "CLOSED";
      } else if (deal.currentRaisedAmount > 0) {
        deal.status = "PARTIALLY_FILLED";
      } else {
        deal.status = "OPEN";
      }

      await deal.save();

      if (oldStatus !== deal.status) {
        console.log(
          `Deal ${deal.companyName} status updated: ${oldStatus} → ${deal.status}`
        );
      }
    }
  } catch (err) {
    console.log("Job Error:", err.message);
  }
};

// run every 30 seconds (demo purpose)
setInterval(updateDealStatusJob, 30000);

console.log(" Deal status job started...");